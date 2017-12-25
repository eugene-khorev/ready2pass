<?php
namespace Deployer;

require 'recipe/laravel.php';

// Project name
set('application', 'stuck-online.info');

// Project repository
set('repository', 'git@github.com:eugene-khorev/ready2pass.git');

// [Optional] Allocate tty for git clone. Default value is false.
set('git_tty', true); 

// Shared files/dirs between deploys 
add('shared_files', []);
add('shared_dirs', []);

// Writable dirs by web server 
add('writable_dirs', []);


// Hosts

host('stuck-online.info')
    ->set('deploy_path', '/var/www/{{application}}');    
    
// Tasks

task('build', function () {
    run('cd {{release_path}} && build');
});

// [Optional] if deploy fails automatically unlock.
after('deploy:failed', 'deploy:unlock');

// Migrate database before symlink new release.

before('deploy:symlink', 'artisan:migrate');

