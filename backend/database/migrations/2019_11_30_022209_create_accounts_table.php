<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAccountsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        /**
         * Category
         * 1: Ortak
         * 2: Hesaplarım
         * 3: Sayfalı
         * 4: Sayfasız
         * 5: Aktif
         * 6: İşlemde
         * 7: Patlak
         * 8: Çöp
         */

        /**
         * Status
         * 1: Aktif
         * -1: Silindi
         */

        Schema::create('accounts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->tinyInteger('category')->default(1);
            $table->string('uname');
            $table->string('upass');
            $table->string('unumber')->unique();
            $table->string('country')->nullable();
            $table->string('lang')->nullable();
            $table->boolean('starred')->default(false);
            $table->boolean('read')->default(false);
            $table->string('_ref')->nullable();
            $table->text('unote')->nullable();
            $table->tinyInteger('status')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('accounts');
    }
}
