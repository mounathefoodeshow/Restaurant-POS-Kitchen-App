<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name'     => 'Admin',
            'email'    => 'admin@gmail.com',
            'password' => Hash::make('admin@gmail.com'),
            'role'     => 'admin',
        ]);
        User::create([
            'name'     => 'Waiter',
            'email'    => 'waiter@gmail.com',
            'password' => Hash::make('waiter@gmail.com'),
            'role'     => 'waiter',
        ]);
        User::create([
            'name'     => 'Kitchen',
            'email'    => 'kitchen@gmail.com',
            'password' => Hash::make('kitchen@gmail.com'),
            'role'     => 'kitchen',
        ]);
    }
}