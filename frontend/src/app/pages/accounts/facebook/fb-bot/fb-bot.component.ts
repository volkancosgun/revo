import { Component, OnInit } from '@angular/core';
import { AccountsService } from 'src/app/pages/accounts/_services/accounts.service';
import { FbAccount } from 'src/app/pages/accounts/_models/fb-account';
import { interval } from 'rxjs/internal/observable/interval';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'vex-fb-bot',
  templateUrl: './fb-bot.component.html',
  styleUrls: ['./fb-bot.component.scss']
})
export class FbBotComponent implements OnInit {

  // Bot data
  bdata: any[];

  // Global Data
  data: FbAccount[];

  // Toplam islem
  total: number = 0;

  // Toplam kalan
  kalan: number = 0;

  // Bot durumu
  isBot: boolean = false;

  // İşlemdeki veri
  item: any = {};

  public intervallTimer = interval(500);
  private subscription;

  constructor(
    private accService: AccountsService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    //this.subscription = this.intervallTimer.subscribe(() => this.getBotData());
    //this.subscription = this.intervallTimer.subscribe(() => this.updateData());
    this.getBotData();
  }

  getBotData(): void {
    this.accService.getAllBot().subscribe((res: any) => {
      this.bdata = res;
      this.bdata.forEach(item => {
        //item['account'] = false;
        item['country'] = '';
        item['country_status'] = 0;
        item['account_status'] = 0;
        item['account_status_msg'] = '';
        item['status'] = 0;
      });

      this.kalan = this.bdata.length;

      console.log(this.bdata);

    });

  }

  getCountry() {

  }

  getErrorDatas() {

    this.bdata = this.bdata.filter((key, value) => {
      return key.status != 2;
    });

  }

  addAccount(_data: any) {

    // Eğer ülke güncellemesi başarısızsa botu devam ettir (3)
    if (_data.country_status == 3) {
      this.total++;
      this.startBot();
      return;
    }


    // Hesap ekleme işleminin başladığını tetikle
    _data.account_status = 1;


    let accData = {} as FbAccount;
    accData.category = 2;
    accData._ref = '99602';
    accData.uname = _data.email;
    accData.upass = _data.sifre;
    accData.country = _data.country.toUpperCase();
    accData.lang = _data.ulke.toUpperCase();
    accData.unote = _data.notx;


    this.accService.createUpdateAccount(accData, false).subscribe((res: any) => {

      if (res.error) {
        _data.account_status = 3;
        _data.account_status_msg = res.msg;
      } else {
        _data.account_status = 2;
      }

      this.dataUpdateStatus(_data);
      this.total++;
      this.startBot();

      console.log(`${_data.id} başarıyla eklendi.`);

    }, err => {
      _data.account_status = 3;
      _data.account_status_msg = 'Sunucuyla bağlantı kurulamadı!';
      this.dataUpdateStatus(_data);
      this.total++;
      this.startBot();
      console.log(`${_data.id} sunucu hatası.`);
    });

  }

  dataUpdateStatus(_data: any): void {

    this.item = _data;

    if (_data.country_status == 2 && _data.account_status == 2) {
      _data.status = 2;
    } else {
      _data.status = 3;
    }
  }

  manuelDataAddAccount(_data: any): void {

    // İşlemde olduğunu tetikle
    _data.status = 1;

    // Hesap ekleme işlemi olduğunu tetikle
    _data.account_status = 1;

    let accData = {} as FbAccount;
    accData.category = 2;
    accData._ref = '99602';
    accData.uname = _data.email;
    accData.upass = _data.sifre;
    accData.country = _data.country.toUpperCase();
    accData.lang = _data.ulke.toUpperCase();
    accData.unote = _data.notx;

    // Hesap ekle
    this.accService.createUpdateAccount(accData, false).subscribe((res: any) => {
      if (res.error) {
        _data.account_status = 3;
        _data.account_status_msg = res.msg;
      } else {
        _data.account_status = 2;
      }

      this.dataUpdateStatus(_data);

    }, err => {
      _data.account_status = 3;
      _data.account_status_msg = 'Sunucuyla bağlantı kurulamadı!';
      this.dataUpdateStatus(_data);
    });


  }

  manuelDataUpdateCountry(_data: any): void {

    // İşlemde oldugunu tetikle
    _data.status = 1;

    // Ülke güncellemesini tetikle
    _data.country_status = 1;

    // Ülke güncelle
    this.accService.getAccountCountry(_data.ipadresi).subscribe((res: any) => {

      if (res && res.ip.country) {
        _data.country = res.ip.country;
        _data.country_status = 2;
        _data.status = 2;
      } else {
        _data.country_status = 3;
        _data.status = 3;
      }

    }, err => {
      _data.country_status = 3;
      _data.status = 3;
    });

  }

  updateData() {

    // Eğer işlem sırası büyük veya eşitse işlem yapılacak olan veriden botu durdur!
    if (this.total >= this.bdata.length) {
      console.log('Bot işlemini tamamladı!');
      this.stopBot();
      return;
    }

    /* if (this.total == 2) {
      this.stopBot();
      return;
    } */

    // Botu durdur
    this.stopBot();

    // İşlem sısrasındaki veriyi bul
    const _data = this.bdata[this.total];

    // Verinin işlemde oldugunu tetikle
    _data.status = 1;

    // Verinin ülke güncellemesi oldugunu tetikle
    _data.country_status = 1;

    if (!_data.ipadresi) {
      _data.country_status = 2;

      switch (_data.ulke) {
        case 'TR':
          _data.country = 'TURKEY';
          break;
        case 'IT':
          _data.country = 'ITALY';
          break;
        case 'GR':
          _data.country = 'GREECE';
          break;
        case 'PT':
          _data.country = 'PORTUGAL';
          break;
        case 'ES':
          _data.country = 'SPAIN';
          break;
        case 'FR':
          _data.country = 'FRANCE';
          break;

          default: 
          _data.country = '';
          break;
      }

      this.addAccount(_data);
      return;
    }

    // Ülke güncelle
    this.accService.getAccountCountry(_data.ipadresi).subscribe((res: any) => {

      if (res && res.ip.country) {

        // Ülke güncellemesinin başarılı oldugunu tetikle
        _data.country_status = 2;

        // Ülkeyi dahil et
        _data.country = res.ip.country;

        console.log(`${_data.id} ülke başarıyla güncellendi.`);

      } else {

        // Ülke güncellemesinin başarısız oldugunu tetikle
        _data.country_status = 3;
        console.log(`${_data.id} ülke güncelleme başarısız.`);

      }

      // Bir sonraki işleme geç : (HESAP EKLEME)
      this.addAccount(_data);

    }, err => {

      // Ülke güncellemesinin başarısız oldugunu tetikle
      _data.country_status = 3;

      // Bir sonraki işleme geç : (HESAP EKLEME)
      this.addAccount(_data);

      console.log(`${_data.id} ülke güncelleme sunucu hatası.`);


    });


    /*  console.log(_updateData);
     this.total++;
     console.log(this.total); */

    // eğer sonuc başarısız olursa
    /* if (this.total == 5) {
      this.total--;
    } */





  }

  startBot(): void {
    this.isBot = true;
    this.subscription = this.intervallTimer.subscribe(() => this.updateData());
    console.log('Bot başlatıldı!');
  }

  stopBot(): void {
    this.isBot = false;
    this.subscription.unsubscribe();
    console.log('Bot durduruldu!');
  }

  nextProgress() {
    console.log(this.bdata);
  }

}
