import {Component, OnInit, ViewChild} from '@angular/core';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';
import {RequestService} from 'iot-master-smart';
import {NzMessageService} from 'ng-zorro-antd/message';
import {CommonModule} from '@angular/common';
import {NzCardComponent} from "ng-zorro-antd/card";
import {SmartEditorComponent, SmartField} from "iot-master-smart";
import {NzTableComponent, NzTableModule} from "ng-zorro-antd/table";

@Component({
    selector: 'app-setting-database',
    standalone: true,
    imports: [
        CommonModule,
        NzButtonComponent,
        RouterLink,
        NzCardComponent,
        SmartEditorComponent,
        NzTableComponent,
        NzTableModule,
    ],
    templateUrl: './setting-database.component.html',
    styleUrl: './setting-database.component.scss'
})
export class SettingDatabaseComponent {

    urls: any[] = [
        {label: 'SQLite', type: 'sqlite', url: "master.db"},
        {label: 'MySQL', type: 'mysql', url: "root:123456@tcp(127.0.0.1)/master?charset=utf8"},
        {label: 'Postgres SQL', type: 'postgres', url: "postgres://root:123456@127.0.0.1/master?sslmode=verify-full"},
        {
            label: 'MS SQL Server',
            type: 'sqlserver',
            url: "sqlserver://sa:123456@127.0.0.1?database=master&connection+timeout=30"
        },
        {label: 'Oracle', type: 'godror', url: 'user="root" password="123456" connectString="127.0.0.1:1521/master"'},
    ]

    @ViewChild('form') form!: SmartEditorComponent

    fields: SmartField[] = [
        {
            key: "type", label: "数据库类型", type: "select",
            options: [
                {label: 'SQLite（内置）', value: 'sqlite'},
                {label: 'MySQL', value: 'mysql'},
                {label: 'Postgres SQL', value: 'postgres'},
                {label: 'MS SQL Server', value: 'sqlserver'},
                {label: 'Oracle', value: 'godror'},
            ]
        },
        {key: "url", label: "连接字符串", type: "text"},
        {key: "debug", label: "调试模式", type: "switch"},
    ]

    values: any = {}

    constructor(private msg: NzMessageService, private rs: RequestService,) {
    }

    ngOnInit(): void {
        this.rs.get('setting/database', {}).subscribe(res => {
            this.values = res.data
        });
    }

    onSubmit() {
        if (!this.form.valid) {
            this.msg.error('请检查数据')
            return
        }

        let url = `setting/database`
        this.rs.post(url, this.form.value).subscribe((res) => {
            this.msg.success('保存成功');
        });
    }

    writeExample(url: string) {
        this.form.patchValue({url})
    }


}
