import {ApplicationConfig, importProvidersFrom, LOCALE_ID} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideNzI18n, zh_CN} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import zh from '@angular/common/locales/zh';
import {provideAnimations} from '@angular/platform-browser/animations';

import {NZ_ICONS} from "ng-zorro-antd/icon";
import {IconDefinition} from '@ant-design/icons-angular';
import {
    ApartmentOutline,
    AppstoreAddOutline,
    AppstoreOutline,
    ArrowLeftOutline,
    BackwardOutline,
    BellOutline,
    BlockOutline,
    BuildOutline,
    CloseCircleOutline,
    ClusterOutline,
    DashboardOutline,
    DeleteOutline,
    DisconnectOutline,
    DownloadOutline,
    DragOutline,
    EditOutline,
    ExportOutline,
    EyeOutline,
    ImportOutline,
    LinkOutline,
    LockOutline,
    MenuFoldOutline,
    MenuUnfoldOutline,
    PlayCircleOutline,
    PlusOutline,
    ProfileOutline,
    ReloadOutline,
    SettingOutline,
    UploadOutline,
    UserOutline,
    VideoCameraOutline,
    ControlOutline,
} from '@ant-design/icons-angular/icons';
import {API_BASE} from "iot-master-smart";
import {provideEcharts} from "ngx-echarts";

registerLocaleData(zh);

const icons: IconDefinition[] = [
    MenuFoldOutline,
    MenuUnfoldOutline,
    DashboardOutline,
    PlusOutline,
    BellOutline,
    SettingOutline,
    EditOutline,
    ApartmentOutline,
    BlockOutline,
    AppstoreOutline,
    AppstoreAddOutline,
    DeleteOutline,
    DownloadOutline,
    UploadOutline,
    UserOutline,
    ProfileOutline,
    EyeOutline,
    ReloadOutline,
    BackwardOutline,
    ArrowLeftOutline,
    LockOutline,
    DisconnectOutline,
    LinkOutline,
    DragOutline,
    ExportOutline,
    ImportOutline,
    VideoCameraOutline,
    ClusterOutline,
    PlayCircleOutline,
    CloseCircleOutline,
    BuildOutline,
    ControlOutline,
];

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideNzI18n(zh_CN),
        importProvidersFrom(FormsModule),
        importProvidersFrom(HttpClientModule),
        provideAnimations(),
        provideEcharts(),
        {provide: NZ_ICONS, useValue: icons},
        {provide: LOCALE_ID, useValue: "zh_CN"},
        {provide: API_BASE, useValue: "/api/"},
    ]
};
