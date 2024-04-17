<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Accesskey;

class GenerateAccesskey extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:generate-accesskey {count?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate Accesskeys!';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $count = is_numeric($this->argument('count')) ? $this->argument('count') : 1;
        $last_id = $this->checkAccesskeyExists() ? Accesskey::latest('id')->first()->id+1 : 1;
        $this->generateAccesskeys($last_id, $count);
    }

    private function checkAccesskeyExists(){
        return Accesskey::count()>0 ? true : false;
    }

    private function generateAccesskeys($last_id, $count){
        for($i=0; $i<$count; $i++){
            $this->insertAccesskeys(hash('crc32', $i+$last_id));
        }
    }

    private function insertAccesskeys($hash_value)
    {
        $accesskey = new Accesskey;
        $accesskey->registration_status = "entry";
        $accesskey->access_key = $hash_value;

        $currentDateTime = date('Y-m-d H:i:s');
        $accesskey->expiration_date = date('Y-m-d H:i:s', strtotime('+1 week', strtotime($currentDateTime)));
        $accesskey->save();
        $this->info($hash_value);
    }
}
