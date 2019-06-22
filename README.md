# json2json

## about
json2json is a super simple json to json transformation module.  It takes a 'map' json data to transform input json data. The whole transformation happens in 20 lines of code,  yeah it is that simple.

## mapfile 

```
<map entry>  :=  <destination_field> : '<source_field>' 
                 || '<destination_filed>:<source_field>' : { <map entry>* }

<map>        :=  { <map entry>* }

```

## examples

1. simple transformation

data
```
{
    name: 'jpetstore',
    id: '234',
    approval: { id: '345', name: 'task approval' },
    tasks: [{ id: 'task#1', name: 'approval task' }, { id: 'task#2', name: 'develop task' }]
}
```
map
```
{
    application_name: 'name',
    external_id: 'id',
    'task_approval:approval': { approval_id: 'id', 'approval_id:name': 'name' },
    'sub_tasks:tasks': { taks_id: 'id', task_name: 'name' }
}
```
result
```
{ 
    application_name: 'jpetstore', 
    external_id: '234',
    task_approval: {approval_id:'345', approval_id:'task approval'},
    sub_tasks: [ 
         { taks_id: 'task#1', task_name: 'approval task' }, 
         { taks_id: 'task#2', task_name: 'develop task' } 
     ]
}
```
