<?php
/**
 *
 * Author: abel
 * Date: 17/7/31
 * Time: 13:31
 */

$common_host = '127.0.0.1';
$common_port = '7259';


return [
    'local' => [
        'host' => $common_host,
        'port' => $common_port,
        'setting' => [
            'worker_num' => 4,
            'daemonize' => false,
            'open_length_check' => true, //开启长度检查
            'package_length_type' => 'N', //长度判定类型 N四字节 n两字节
            'package_length_offset' => '0', //长度开始位置
            'package_body_offset' => 4, //包头长度 包含四字节长度单位
            'package_max_length' => 1024*1024*3, //byte->K->M 最大允许3MB内容传输
            'buffer_output_size' => 1024*1024*3
        ],
        'client' => [
            'host'=> $common_host,
            'port' => $common_port
        ]
    ],
    'test' => [
        'host' => $common_host,
        'port' => $common_port,
        'setting' => [
            'worker_num' => 4,
            'daemonize' => false,
            'open_length_check' => true, //开启长度检查
            'package_length_type' => 'N', //长度判定类型 N四字节 n两字节
            'package_length_offset' => '0', //长度开始位置
            'package_body_offset' => 4, //包头长度 包含四字节长度单位
            'package_max_length' => 1024*1024*3, //byte->K->M 最大允许3MB内容传输
            'buffer_output_size' => 1024*1024*3
        ],
        'client' => [
            'host'=> $common_host,
            'port' => $common_port
        ]
    ],
    'rls' => [
        'host' => '192.168.2.140',
        'port' => '65531',
        'setting' => [
            'worker_num' => 50,
            'daemonize' => true,
            'open_length_check' => true, //开启长度检查
            'package_length_type' => 'N', //长度判定类型 N四字节 n两字节
            'package_length_offset' => '0', //长度开始位置
            'package_body_offset' => 4, //包头长度 包含四字节长度单位
            'package_max_length' => 1024*1024*3, //byte->K->M 最大允许3MB内容传输
            'buffer_output_size' => 1024*1024*3
        ],
        'client' => [
            'host'=> '192.168.2.140',
            'port' => '65531'
        ]
    ]

];