<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use App\User;
use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
 */

$factory->define(User::class, function (Faker $faker) {
    return [
        'name' => $faker->firstName(),
        'email' => $faker->unique()->safeEmail,
        'email_verified_at' => now(),
        'password' => 'adw123adw',
        'unumber' => $faker->numberBetween(90000, 99998),
        'role' => $faker->randomElement(['admin', 'user']),
        'status' => $faker->randomElement([0, 1, 2]),
    ];
});
