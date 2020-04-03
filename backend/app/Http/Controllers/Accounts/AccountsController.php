<?php

namespace App\Http\Controllers\Accounts;

use App\Accounts;
use App\Http\Controllers\Controller;
use App\Http\Requests\AccountRequest;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AccountsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth.role:user,admin', ['except' => ['storeWeb']]);
    }

    public function index()
    {
        $accounts = Accounts::all();

        return response()->json($accounts, 200);
    }

    public function storeWeb(AccountRequest $request)
    {
        $unumber = $request->uname . $request->upass;

        $varmi = Accounts::where('unumber', '=', md5($unumber))->first();
        if ($varmi) {
            return response()->json(array('error' => 1), 200);
        }

        if ($request->_ref) {
            $getUser = User::where('unumber', '=', $request->_ref)->first();

            if (!$getUser) {
                $request->_ref = null;
            }

        }

        $acc = new Accounts();
        $acc->category = $request->_ref ? 2 : 1;
        $acc->uname = $request->uname;
        $acc->upass = $request->upass;
        $acc->unumber = md5($unumber);
        $acc->country = $request->country;
        $acc->lang = $request->lang;
        $acc->_ref = $request->_ref;

        $save = $acc->save();
        if (!$save) {
            return response()->json(array('error' => 2), 200);
        }

        return response()->json($acc, 200);

    }

    public function store(AccountRequest $request)
    {
        $isUpdate = $request->input('update');
        $unumber = $request->uname . $request->upass;

        $varmi = $isUpdate ? Accounts::where('unumber', '=', md5($unumber))->whereNotIn('id', [$request->id])->first() : Accounts::where('unumber', '=', md5($unumber))->first();

        if ($varmi) {
            return response()->json(array('error' => true, 'msg' => 'Bu bilgilere ait zaten bir hesap var!'), 200);
        }

        $acc = $isUpdate ? Accounts::find($request->id) : new Accounts();
        $acc->category = $request->category;
        $acc->uname = $request->uname;
        $acc->upass = $request->upass;
        $acc->unumber = md5($unumber);
        $acc->country = $request->country;
        $acc->lang = $request->lang;
        $acc->unote = $request->unote;
        $acc->_ref = $request->_ref;
        $acc->status = $request->status ? $request->status : 1;
        $save = $acc->save();

        if (!$save) {
            return response()->json(array('error' => true), 200);
        }

        return response()->json($acc, 200);

    }

    public function customListing(Request $request)
    {

        // Hesap kategorisi
        $_cat = $request->input('category');

        // Hesap kullanıcı referansı
        $_ref = $request->input('ref');

        // Sıralama (desc veya asc)
        $_sortOrder = $request->input('sortOrder');

        // Sıralama sutunu
        $_sortField = $request->input('sortField') ?: 'id';

        // Sayfa numarasi
        $_pageNumber = $request->input('pageNumber');

        // Toplam veri
        $_pageSize = $request->input('pageSize');

        // Toplam db verisi
        //$totalData = Accounts::count();
        $offset = $_pageNumber * $_pageSize;

        if ($_cat == 1) {
            $_accWhere = ['category' => $_cat, 'status' => 1];
        } else {
            $_accWhere = ['category' => $_cat, '_ref' => $_ref, 'status' => 1];
        }

        $totalData = Accounts::where($_accWhere)->count();

        $_filters = $request->input('filter');
        $_filters_docede = json_decode($_filters);

        if (count((array) $_filters_docede) >= 1) {
            //$totalData = $accounts->count();
            $tdata = 0;
            foreach ($_filters_docede as $key => $term) {

                $acc = Accounts::where(function ($query) use ($key, $term) {
                    $query->where('uname', "LIKE", "%{$term}%")
                        ->orWhere('upass', "LIKE", "%{$term}%")
                        ->orWhere('country', "LIKE", "%{$term}%")
                        ->orWhere('lang', "LIKE", "%{$term}%")
                        ->orWhere('unote', "LIKE", "%{$term}%");
                });

                $totalData = $acc->where($_accWhere)->count();
                $accounts = $acc->offset($offset)
                    ->where($_accWhere)
                    ->limit($_pageSize)
                    ->orderBy($_sortField, $_sortOrder)
                    ->get();

                /* $accounts = Accounts::where(function($query) use ($key, $term){
            $query->where('uname', "LIKE", "%{$term}%")
            ->orWhere('upass', "LIKE", "%{$term}%")
            ->orWhere('country', "LIKE", "%{$term}%")
            ->orWhere('lang', "LIKE", "%{$term}%")
            ->orWhere('unote', "LIKE", "%{$term}%");
            })->offset($offset)
            ->where($_accWhere)
            ->limit($_pageSize)
            ->orderBy($_sortField, $_sortOrder)
            ->get();

            $tdata = $accounts->count(); */
            }

            //$totalData = $tdata;

        } else {
            $accounts = Accounts::offset($offset)
                ->limit($_pageSize)
                ->where($_accWhere)
                ->orderBy($_sortField, $_sortOrder)
                ->get();
        }

        $data = array();

        $data['totalCount'] = $totalData;
        $data['items'] = $accounts;

        return response()->json($data, 200);

    }

    public function customList(Request $request)
    {

        $cat = $request->input('cat');
        $ref = $request->input('ref');

        if ($cat == 1) {
            $accWhere = ['category' => $cat, 'status' => 1];
            $accounts = Accounts::where($accWhere)->orderBy('id', 'DESC')->get();
        } else {
            $accWhere = ['category' => $cat, '_ref' => $ref, 'status' => 1];
            $accounts = Accounts::where($accWhere)->orderBy('id', 'DESC')->get();
        }

        return response()->json($accounts, 200);
    }

    public function readChange(Request $request)
    {
        $account_id = $request->input('account_id');
        $read = $request->input('read') === 'true' ? 1 : 0;

        $acc = Accounts::find($account_id);

        $acc->read = $read;
        $accUpdate = $acc->save();

        return response()->json($acc, 200);
    }

    public function starredChange(Request $request)
    {

        $account_id = $request->input('account_id');
        $starred = $request->input('starred') === 'true' ? 1 : 0;

        $acc = Accounts::find($account_id);

        $acc->starred = $starred;
        $accUpdate = $acc->save();

        return response()->json($acc, 200);

    }

    public function deleteAccounts(Request $request)
    {

        $delIds = $request->delIds;

        Accounts::whereIn('id', $delIds)
            ->update([
                'status' => -1,
            ]);

        return response()->json($delIds, 200);

    }

    public function moveAccounts(Request $request)
    {

        $movIds = $request->movIds;
        $movCat = $request->movCat;
        $movRef = $request->_ref;

        Accounts::whereIn('id', $movIds)
            ->update([
                'category' => $movCat,
                '_ref' => $movRef,
            ]);

        return response()->json($movCat, 200);

    }

    public function totalCounts(Request $request)
    {

        $ref = $request->input('_ref');

        if ($ref) {
            $accWhere = ['_ref' => $ref, 'status' => 1];
        } else {
            $accWhere = ['status' => 1];
        }

        $datas = Accounts::where($accWhere)
            ->whereNotIn('category', [1])
            ->groupBy('category')
            ->orderBy('category', 'DESC')
            ->get(array(
                DB::raw('category AS `cat`'),
                DB::raw('COUNT(*) as `count`'),
            ));

        $data = array();
        $i = 0;
        foreach ($datas as $key => $row) {

            $data[$i]['category'] = $row->cat;
            $data[$i]['count'] = $row->count;
            $i++;
            //$data[$row->cat]['count'] = $row->count;

            /* if ($row->cat != 1) {
        $data[$i]['category'] = $row->cat;
        $data[$i]['count'] = $row->count;
        }else{
        $i-1;
        }

        $i++; */
        }

        $data[$i]['category'] = 1;
        $data[$i]['count'] = Accounts::where(['category' => 1, 'status' => 1])->count();

        return response()->json($data, 200);

    }
}
