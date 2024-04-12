import {Component, Input, OnInit} from '@angular/core';
import {NzStatisticComponent} from "ng-zorro-antd/statistic";
import {RequestService} from "iot-master-smart";

@Component({
    selector: 'app-count',
    standalone: true,
    imports: [
        NzStatisticComponent
    ],
    templateUrl: './count.component.html',
    styleUrl: './count.component.scss'
})
export class CountComponent implements OnInit {

    @Input() model = 'device'
    @Input() title = '设备总数'
    @Input() project = ''

    count = 0;

    constructor(private rs: RequestService) {
    }

    ngOnInit(): void {
        let query: any = {}
        if (this.project)
            query.filter = {project_id: this.project}

        this.rs.post(this.model + '/count', query).subscribe(res => {
            this.count = res.data
        })
    }


}
