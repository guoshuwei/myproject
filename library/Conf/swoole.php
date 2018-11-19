<?php
$config['local'] = array(
    'uaction' => array(
        0 => array(
            'host'=>'127.0.0.1',
            'port'=>'9501',
            'set' => array(
                'worker_num' => 20,
            )
        )
    ),
    'coupon' => array(
        'host'=>'127.0.0.1',
        'port'=>'9503',
        'set' => array(
            'worker_num' => 4,
            'daemonize' => false,
            'task_worker_num' => 10,
        ),
        'log' => array(
            'file' => LIBRARY_DIR . '/../TyLogs/coupon/ui'
        ),
        'task' => array(
            'file' => LIBRARY_DIR . '/../TyLogs/coupon_task/ui'
        )
    ),
    'rebate' => array(
        'host' => '127.0.0.1',
        'port' => 9504,
        'set' => array(
            'worker_num' => 2,
            'daemonize' => false,
            'task_worker_num' => 10,
            'task_ipc_mode' => 3,
            'message_queue_key' => '0x12f0e20',
            'open_eof_split' => true,
            'package_eof' => "\r\n",
        ),
    ),
);

$config['test'] = array(
    'uaction' => array(
        0 => array(
            'host'=>'127.0.0.1',
            'port'=>'9501',
            'set' => array(
                'worker_num' => 20,
            )
        )
    ),
    'coupon' => array(
        'host'=>'127.0.0.1',
        'port'=>'9503',
        'set' => array(
            'worker_num' => 4,
            'daemonize' => false,
            'task_worker_num' => 10,
        ),
        'log' => array(
            'file' => LIBRARY_DIR . '/../TyLogs/coupon/ui'
        ),
        'task' => array(
            'file' => LIBRARY_DIR . '/../TyLogs/coupon_task/ui'
        )
    ),
    'rebate' => array(
        'host' => '127.0.0.1',
        'port' => 9504,
        'set' => array(
            'worker_num' => 2,
            'daemonize' => false,
            'task_worker_num' => 10,
            'task_ipc_mode' => 3,
            'message_queue_key' => '0x12f0e20',
            'open_eof_split' => true,
            'package_eof' => "\r\n",
        ),
    ),
);

$config['rls'] = array(
    'uaction' => array(
        0 => array(
            'host'=>'192.168.2.144',
            'port'=>'9501',
            'set' => array(
                'worker_num' => 20,
            )
        )
    ),
    'coupon' => array(
        'host'=>'192.168.2.141',
        'port'=>'9503',
        'set' => array(
            'worker_num' => 4,
            'daemonize' => true,
            'task_worker_num' => 10,
        ),
        'log' => array(
            'file' => LIBRARY_DIR . '/../TyqLogs/coupon/ui'
        ),
        'task' => array(
            'file' => LIBRARY_DIR . '/../TyqLogs/coupon_task/ui'
        )
    ),
    'rebate' => array(
        'host' => '192.168.2.141',
        'port' => 9504,
        'set' => array(
            'worker_num' => 2,
            'daemonize' => false,
            'task_worker_num' => 10,
            'task_ipc_mode' => 3,
            'message_queue_key' => '0x12f0e20',
            'open_eof_split' => true,
            'package_eof' => "\r\n",
        ),
    ),
);
return $config;