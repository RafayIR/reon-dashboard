import { useState, useEffect, lazy, Suspense, useRef } from 'react';
import { Form, Input, InputNumber, Popconfirm, Table, Space, Typography, Spin, type TableProps, message } from 'antd';
import { type Site, type RootState, type EditableCellProps } from '../../utils/type';
import { useSelector, useDispatch } from 'react-redux';
import { updateSiteRequest } from '../../redux/actions/siteAction';
import ModalComponent from '../ui/Modal';
import { showModal } from '../../redux/actions/modalAction';
const SiteInsightChart = lazy(() => import('./SiteInsightChart'));

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
  const { data: storedData, loading } = useSelector((state: RootState) => state.sites);
  const [selectedSite, setSelectedSite] = useState<null | typeof storedData[0]>(null);
  const dispatch = useDispatch()
  const [data, setData] = useState<Site[] | undefined>(storedData);
  const [editingKey, setEditingKey] = useState('');
  const previousLoading = useRef(loading);
  const [messageApi, contextHolder] = message.useMessage();


  useEffect(() => {
    setData(storedData);
    if (previousLoading.current && !loading) {
      success()
    }
    previousLoading.current = loading;

  }, [storedData, loading]);

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Record Updated successfully',
    });
  };

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
      {contextHolder}
      {
        storedData && storedData.length > 0 ? (
          <Form form={form} component={false}>
            <Table
              loading={loading}
              columns={mergedColumns}
              rowClassName="editable-row"
              dataSource={data}
              scroll={{ x: 'max-content' }}
              components={{
                body: { cell: EditableCell },
              }}
            />
          </Form>
        )
          :
          (
            <Spin fullscreen />
          )
      }
      <ModalComponent title="">
        <Suspense fallback={<Spin />}>
          <SiteInsightChart insightData={selectedSite?.insights} siteName={selectedSite?.name} />
        </Suspense>
      </ModalComponent>
    </div>
  )
}


export default DashboardTable;