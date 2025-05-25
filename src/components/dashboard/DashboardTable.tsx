import { useState, useEffect } from 'react';
import type { TableProps } from 'antd';
import { Form, Input, InputNumber, Popconfirm, Table, Space, Typography } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Spin } from "antd";
import { updateSiteRequest } from '../../redux/actions/siteAction';
import { type Site, type RootState, type EditableCellProps } from '../../utils/type';
import ModalComponent from '../ui/Modal';
import { showModal } from '../../redux/actions/modalAction';
import SiteInsightChart from './SiteInsightChart';


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


const DashboardTable = () => {
  const [form] = Form.useForm();
  const storedData = useSelector((state: RootState) => state.sites?.data);
  const loading = useSelector((state: RootState) => state.sites?.loading);
  const [selectedSite, setSelectedSite] = useState<null | typeof storedData[0]>(null);
  const dispatch = useDispatch()
  const [data, setData] = useState<Site[] | undefined>(storedData);
  const [editingKey, setEditingKey] = useState('');

  useEffect(() => {
    setData(storedData);
  }, [storedData]);

  const isEditing = (record: Site) => record.id === Number(editingKey);
  const edit = (record: Partial<Site>) => {
    form.setFieldsValue({ ...record });
    setEditingKey(String(record.id));
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (id: number) => {
    try {
      const values = await form.validateFields();
      dispatch(updateSiteRequest({ ...values, id }));
      setEditingKey('');
    } catch (errInfo) {
      console.error('Validation failed:', errInfo);
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
      render: (_: any, record: Site) => {
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
            <Typography.Link onClick={() => { setSelectedSite(record), dispatch(showModal()) }}>
              View Insights
            </Typography.Link>
          </Space>
        )

      }
    }
  ];

  const mergedColumns: TableProps<Site>['columns'] = columns?.map((col) => {
    if (!(col as any).editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Site) => ({
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
      {
        storedData && storedData.length > 0 ? (
          <Form form={form} component={false}>
            <Table
              loading={loading}
              columns={mergedColumns}
              rowClassName="editable-row"
              dataSource={data}
              components={{
                body: { cell: EditableCell },
              }}
            />
          </Form>
        )
          :
          (
            <Spin />
          )
      }
      <ModalComponent title="">
        <SiteInsightChart insightData={selectedSite?.insights} siteName={selectedSite?.name} />
      </ModalComponent>

    </div>
  )
}


export default DashboardTable;