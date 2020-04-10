<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Accounts;
use App\User;
use Faker\Generator as Faker;

$factory->define(Accounts::class, function (Faker $faker) {

    $unumber = $faker->freeEmail() . $faker->password();

    return [
        'category' => $faker->randomElement([1,2,3,4,5,6,7,8,9]),
        'uname' => $faker->freeEmail(),
        'upass' => $faker->password(),
        'unumber' => md5($unumber),
        'country' => $faker->randomElement(['TURKEY', 'ITALY', 'FRANCE', 'GRECEE']),
        'lang' => $faker->randomElement(['TR', 'IT', 'FR', 'GR']),
        'starred' => $faker->randomElement([0, 1]),
        'unote' => $faker->realText(20),
        '_ref' => User::all()->random()->unumber,
    ];
});
