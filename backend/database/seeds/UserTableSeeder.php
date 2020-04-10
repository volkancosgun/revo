<?php

use App\User;
use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = new User;

        $user->name = 'Volkan';
        $user->email = 'volkan@deneme.com';
        $user->email_verified_at = now();
        $user->password = 'adw123adw';
        $user->unumber = '99999';
        $user->role = 'admin';
        $user->status = 1;

        $user->save();

        factory(App\User::class, 10)->create();

    }
}
