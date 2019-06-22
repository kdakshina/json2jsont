import test from 'tape'
import j2j from '../src/transform'

test('sample', (t) => {
    let data = {
        name: 'jpetstore',
        id: '234',
        approval: { id: '345', name: 'task approval' },
        tasks: [{ id: 'task#1', name: 'approval task' }, { id: 'task#2', name: 'develop task' }]
    }
    let map = {
        application_name: 'name',
        external_id: 'id',
        'task_approval:approval': { approval_id: 'id', 'approval_id:name': 'name' },
        'sub_tasks:tasks': { taks_id: 'id', task_name: 'name' }
    }
    let expected = { 
        application_name: 'jpetstore', 
        external_id: '234',
        task_approval: {approval_id:'345', approval_id:'task approval'},
        sub_tasks: [ { taks_id: 'task#1', task_name: 'approval task' }, { taks_id: 'task#2', task_name: 'develop task' } ]
    }
    let result = j2j().transform(data, map)
    t.deepEqual(result, expected)
    t.end()
})