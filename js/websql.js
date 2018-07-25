var dbname = "student"; //数据库名字
var version='1.0';	//数据库版本
var dbdesc='websql test'; //数据库描述
var dbsize=2*1024*1024; //数据库大小
var dataBase=null; //暂存数据库对象

var websqlTable="websqlTable";//数据库表单名


/**
 * 打开数据库
 */
function websqlOpenDB(){
	dataBase = window.openDatabase(dbname,version,dbdesc,dbsize,function(){});
	if (dataBase) {
		alert("数据库创建/打开成功！");
	} else{
		alert("数据库创建/打开失败！");
	}
	return dataBase;
}


/**
 * 向表单里面插入数据
 * 
 * @param {Object} tablename:表单名
 */
function websqlCreateTable(tablename){
	
	var creatTableSQL = 'CREATE TABLE IF  NOT EXISTS '+ tablename+' (rowid INTEGER PRIMARY KEY AUTOINCREMENT,NAME,AGE,HEIGHT,WEIGTH)';
	dataBase.transaction(function(ctx,result){
		ctx.executeSql(creatTableSQL,[],function(ctx,result){
			alert("表创建成功:"+tablename);
		},function(tx,error){
			alert("表创建失败:"+tablename+" " +error.message);
		});	
	});
	
}


function websqlInsertDataToTable(tablename,name,age,height,zhong){
	var insertTableSQL='INSERT INTO ' + tablename + ' (name,age,height,weigth) VALUES (?,?,?,?)'
	var ret = 0;
	dataBase.transaction(function(ctx){
		ctx.executeSql(insertTableSQL,[name,age,height,zhong],function (ctx,result){
            console.log("插入" + tablename  + name + "成功");
        },
        function (tx, error) {
            alert('插入失败: ' + error.message);
            console.log(error.message);
            ret = 1;
        });
	});
	return ret;
}


/**
 * 
 * @param {Object} tablename: 表单名
 * @param {Object} name： 姓名
 */
function websqlGetData(tablename,name){
	var selectSQL = 'SELECT * FROM '+tablename+' WHERE NAME = ?'
	dataBase.transaction(function(ctx){
		ctx.executeSql(selectSQL,[name],function(ctx,result){
			alert("查询成功"+tablename+result.rows.length);
			var len = resizeBy.rows.length;
			for(var i=0;i<len;i++){
				console.log("NAME= "+result.rows.item(i).NAME);
				console.log("AGE= "+result.rows.item(i).AGE);
				console.log("HEIGHT= "+result.rows.item(i).HEIGHT);
				console.log("WEIGHT= " + result.rows.item(i).WEIGTH);
			}
		},
		function(tx,error){
			alert('查询失败'+error.message);	
		});
	});
}


/**
 * 
 * @param {Object} tableName: 表单名
 */
function websqlGetAllData(tableName){   
    var selectALLSQL = 'SELECT * FROM ' + tableName;
    dataBase.transaction(function (ctx) {
        ctx.executeSql(selectALLSQL,[],function (ctx,result){
            alert('查询成功: ' + tableName + " "+result.rows.length+"条");
            var len = result.rows.length;
            for(var i = 0;i < len;i++) {
                console.log("NAME = "  + result.rows.item(i).NAME);
                console.log("AGE = "  + result.rows.item(i).AGE);
                console.log("HEIGHT = "  + result.rows.item(i).HEIGHT);
                console.log("WEIGHT = "  + result.rows.item(i).WEIGTH);
                console.log("---------------------------");
            }
        },
        function (tx, error) {
            alert('查询失败: ' + error.message);
        });
    });
}

/**
 * 
 * @param {Object} tablename:表单名
 */
function websqlDeleteAllDataFromTable(tablename){
	var deleteTableSQL='DELETE FROM '+tablename;
	localStorage.removeItem(tablename);
	dataBase.transaction(function(ctx,result){
		ctx.executeSql(deleteTableSQL,[],function(ctx,result){
			alert("删除表成功:"+tablename);
		},function(tx,error){
			alert("删除表失败:"+tablename+error.message);
		});
	});
}


/**
 * 
 * @param {Object} tableName
 * @param {Object} name：数据名称
 */
function websqlDeleteADataFromTable(tableName,name){
    var deleteDataSQL = 'DELETE FROM ' + tableName + ' WHERE NAME = ?';
    localStorage.removeItem(tableName);
    dataBase.transaction(function (ctx,result) {
        ctx.executeSql(deleteDataSQL,[name],function(ctx,result){
            alert("删除成功 " + tableName + name);
        },function(tx, error){ 
            alert('删除失败:' + tableName  + name + error.message);
        });
    });
}

/**
 * 
 * @param {Object} tableName
 * @param {Object} name：姓名
 * @param {Object} age：年龄
 */
function websqlUpdateAData(tableName,name,age){
    var updateDataSQL = 'UPDATE ' + tableName + ' SET AGE = ? WHERE NAME = ?';
    dataBase.transaction(function (ctx,result) {
        ctx.executeSql(updateDataSQL,[age,name],function(ctx,result){
            alert("更新成功 " + tableName + name);
        },function(tx, error){ 
            alert('更新失败:' + tableName  + name + error.message);
        });
    });
}
