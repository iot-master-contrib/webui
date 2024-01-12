function isIncludeAdmin() {
    if (location.pathname.startsWith("/admin")) {
        return '/admin';
    }
    return '';
}

function readCsv(e: any, that: any, url: string) {
    const file = e.target.files[0];
    if (file.type != "text/csv") {
        that.msg.error("文件类型错误");
        return;
    }
    that.uploading = true;
    let reader: any = new FileReader();
    const data: any = [];
    reader.onload = () => {
        const result: any = reader.result || '';
        let lines = result.split("\r\n");
        lines.map((item: string, index: any) => {
            let line = item.split(",");
            data.push(line);
        });
        // 处理数据
        handleData(data, that, url);
    };
    reader.readAsText(file, 'gb2312');
}
function handleData(data: (string | any[])[], that: any, url: string) {
    data.splice(0, 1);//删除表头
    let len = data.length;
    const resData = [];
    data.forEach((item: string | any[]) => {
        const sendData: any = {}
        for (let index = 0; index < that.columnKeyNameArr.length; index++) {
            const keyName = that.columnKeyNameArr[index];
            if (item[index]) {
                sendData[keyName] = item[index];
            }
        }

        if (JSON.stringify(sendData) === "{}") {
            len--;
            return;
        }
        that.rs.post(url, sendData).subscribe((res: any) => {
            resData.push(res);
            if (resData.length === len) {
                that.uploading = false;
                that.msg.success("导入成功!")
                that.load();
            }
        }, (error: any) => {
            that.uploading = false;
        })
    });
}
/**
 * @desc 计算表格高度
 */
function tableHeight(that: any) {
    const tbTop: any = document.querySelector('.ant-table')?.getBoundingClientRect().top || 0;
    const allH = document.querySelector('.ant-layout')?.clientHeight || 0;
    const pageHeight = 120;
    const height = allH - tbTop - pageHeight;
    return { y: `${height}px` };
}
function onAllChecked(checked: boolean, that: any): void {
    if (!that.datum) {
        return;
    }
    that.datum.forEach((item: any) => updateCheckedSet(item.id, checked, that));
    refreshCheckedStatus(that);
}
function onItemChecked(id: number, checked: boolean, that: any): void {
    updateCheckedSet(id, checked, that);
    refreshCheckedStatus(that);
}

function updateCheckedSet(id: number, checked: boolean, that: any) {
    if (checked) {
        that.setOfCheckedId.add(id);
    } else {
        that.setOfCheckedId.delete(id);
    }
}
function refreshCheckedStatus(that: any) {
    if (!that.datum) {
        return
    }
    that.checked = that.datum.every((item: { id: any; }) => that.setOfCheckedId.has(item.id));
    that.indeterminate = that.datum.some((item: { id: any; }) => that.setOfCheckedId.has(item.id)) && !that.checked;
}
function batchdel(that: any) {
    that.delResData = [];
    const size = that.setOfCheckedId.size;
    if (!size) {
        that.msg.warning('请先勾选删除项');
        return;
    }
    const ids = Array.from(that.setOfCheckedId);
    that.modal.confirm({
        nzTitle: `确定删除勾选的${size}项？`,
        nzOnOk: () => {
            ids.forEach(id => {
                that.delete(id, size);
            });
        }
    });
}
export {
    isIncludeAdmin,
    readCsv,
    tableHeight,
    onAllChecked,
    onItemChecked,
    refreshCheckedStatus,
    batchdel
}