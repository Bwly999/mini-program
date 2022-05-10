# cola-u-chat


##用于全端的聊天界面及功能
插件交流QQ群：914490319
----------------------
后续会更新2.0版本，有需要觉得有用的功能可以在此提(https://docs.qq.com/doc/DUWRlaVVFenNwSHdB)
-------------------------------------
```
---1.0.2
--更新：支持下拉加载更多
--更新：支持自定义数据绑定键名
--更新：支持已读未读(功能暂未完善，目前仅可在添加数据时添加已读未读，但这样是不合理的hhh)是否开启及状态显示
---1.0.1
--更新：更多按钮点击展开及动画效果
--更新：支持自定义更多功能，具有自定义功能回调
--更新：支持展示图片消息，支持历史消息展示
---1.0.0
--更新：目前功能涵盖聊天发送，接收消息及展示，根据最后一条消息展示，可连续发送消息
```

必要传入数据
==========

|名称|基本格式|
|---|-------|
|userId|当前用户的用户ID|
|dataKeys|用户可自定义数据类型名，根据后端数据名渲染，无需额外处理|
|userIdName(已废弃，请使用<kbd>dataKeys</kbd>)|设置用户user的判断，主要用于判断当前用户还是对方用户|
|IDType|IDType="msgId"(此id应为每条消息id，不可重复)|
|msgName(已废弃，请使用<kbd>dataKeys</kbd>)|数据消息的展示字段名|
|messageData|数组对象形式|
|updateMsg|数据格式同<kbd>message</kbd>中的对象形式|
|historyMsg|数据格式同<kbd>message</kbd>中的对象形式,但是可以是数组形式，传入多条消息|
|moreFunction|数组对象形式|
|iconSize|设置更多功能的图标大小|
|isUseRefresh|是否启用下拉加载更多(默认false)|


messageData(数组对象)
-----------

|名称|意义|
|---|----|
|msgId|当前消息的id名称，可根据IDType动态设置绑定|
|name|用户昵称|
|message|消息内容|
|avator|用户头像|


dataKeys(对象)
-----------

|名称|意义|
|---|----|
|userId|消息的发送用户id|
|msgId|消息的id|
|name|发送该条信息的用户昵称|
|message|该条消息的内容|
|img|该条消息的图片内容|
|avator|该条消息的用户头像|
|read(该功能暂未完善)|该条消息是否已读|

```
会根据传入字段名，返回对应数据，所以请将需要的字段名写进
示例：
dataKeys = {
	userId:'myUserId',
	msgId:'myMsgId',
	name:'myName',
	message:'myMessageName',
	img:'myImg',
	avator:'myAvator'
}
```

moreFunction(数组对象)
------------

|名称|意义|
|---|----|
|name|方法名字|
|icon|图标(目前只支持uView官方图标库)|
|img|自定义展示图片|


Function  方法
--------------

|方法名|意义|
|---|----|
|@refresh|获取触发下拉加载的方法|
|@sendMsg|获取输入框打入的数据 \br 需要讲新数据(已确认)的数据通过updateMsg传入|
|@moreClick|获取【+】号中的自定义方法的点击项
