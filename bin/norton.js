#! /usr/bin/env node 
const program = require('commander');
const inquirer = require('inquirer');
const _ = require('lodash');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const Cli = require('clui');
const clone = require('git-clone');
const Spinner = Cli.Spinner;

clear();
console.log(
  chalk.yellow(
    figlet.textSync('Tnc', { horizontalLayout: 'full' })
  )
);
program
    .command('init')
    .alias('n')
    .description('创建新的模块')
    .option('--name [moduleName]')
    .option('--sass', '启用sass')
    .option('--less', '启用less')
    .action(option => {
        var config = _.assign({
            moduleName: null,
            description: '',
            sass: false,
            less: false
        }, option)
        var promps = []
        if(config.moduleName !== 'string') {
              promps.push({
                type: 'input',
                name: 'moduleName',
                message: '请输入模版名称',
                validate: function (input){
                    if(!input) {
                        return '不能为空'
                    }
                    return true
                }
              })
        } 
        if(config.description !== 'string') {
            promps.push({
                type: 'input',
                name: 'tplDesc',
                message: '请输入模版描述'
            })
        }
        if(config.sass === false && config.less === false) {
          promps.push({
            type: 'list',
            name: 'tplType',
            message: '请选择模版类型',
            choices: [
              {
                name: 'React',
                value: 'react'
              },
              {
                name: 'Vue',
                value: 'vue'
              },
              {
                name: 'Angular',
                value: 'angular'
              },
              {
                name: 'Weapp',
                value: 'weapp'
              }
            ]
          })
        }
        if(config.description !== 'string') {
            promps.push({
                type: 'input',
                name: 'gitUrl',
                message: 'remote url'
            })
        }
        inquirer.prompt(promps).then((options) => {
            const status = new Spinner('模版正在创建中，请稍后...');
            status.start();
            clone(`${options.gitUrl}`, `${process.cwd()}`, () => {
                status.stop();
            });
        });
    })
program.parse(process.argv)
