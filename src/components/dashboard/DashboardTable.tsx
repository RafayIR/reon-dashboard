import { useState } from 'react';
import type { TableProps } from 'antd';
import { Form, Input, InputNumber, Popconfirm, Table, Space, Typography } from 'antd';

interface DataType {
  id: number;
  name: string;
  status: string;
  lastUpdated: string;
  alarms: number;
  tickets: number;
  devices: number;
  insights: number[]; // Keep it because it's in the data
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: DataType;
  index: number;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};


const rawData = localStorage?.getItem('sites');
const storedData: DataType[] | undefined = rawData ? JSON.parse(rawData) : undefined;

const DashboardTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<DataType[] | undefined>(storedData);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record: DataType) => record.id === Number(editingKey);

  const edit = (record: Partial<DataType>) => {
    form.setFieldsValue({ ...record });
    setEditingKey(String(record.id));
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (id: number) => {
    try {
      const row = (await form.validateFields()) as DataType;
      const newData = [...(data ?? [])];
      const index = newData.findIndex((item) => item.id === id);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row, id }); // ← Ensure ID is kept
        setData(newData);
        localStorage.setItem('sites', JSON.stringify(newData));
        setEditingKey('');
      } else {
        newData.push({ ...row, id }); // ← Add the ID here
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',

    },
    {
      title: 'Site Name',
      dataIndex: 'name',
      key: 'name',
      editable: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      editable: true,
    },
    {
      title: 'Alarms',
      dataIndex: 'alarms',
      key: 'alarms',
      editable: true,
    },
    {
      title: 'Tickets',
      dataIndex: 'tickets',
      key: 'tickets',
      editable: true,
    },
    {
      title: 'Devices',
      dataIndex: 'devices',
      key: 'devices',
      editable: true,
    },
    {
      title: 'Last Updated',
      dataIndex: 'lastUpdated',
      key: 'lastUpdated',
      editable: true,
    },
    {
      title: 'Action',
      key: 'action',
      width: 250,
      render: (_: any, record: DataType) => {
        const editable = isEditing(record);
        return (
          <Space size="middle">
            {editable ? (
              <span>
                <Typography.Link onClick={() => save(record.id)} style={{ marginInlineEnd: 8 }}>
                  Save
                </Typography.Link>
                <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                  <a>Cancel</a>
                </Popconfirm>
              </span>
            ) : (
              <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                Edit
              </Typography.Link>
            )}
            <a href="#">View Insights</a>
          </Space>
        )

      }
    }
  ];

  const mergedColumns: TableProps<DataType>['columns'] = columns?.map((col) => {
    if (!(col as any).editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        inputType: (col.dataIndex === 'name' ? 'status' : 'text') as 'number' | 'text',
        dataIndex: col.dataIndex,
        title: typeof col.title === 'string' ? col.title : undefined,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div className='table-wrapper mt-16 shadow-md'>
      <Form form={form} component={false}>
        <Table<DataType>
          columns={mergedColumns}
          rowClassName="editable-row"
          dataSource={data}
          components={{
            body: { cell: EditableCell },
          }}
        />
      </Form>
    </div>
  )
}


export default DashboardTable;