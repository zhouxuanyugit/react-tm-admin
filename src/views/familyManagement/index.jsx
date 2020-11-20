import React, { Component } from "react";
import {
  Table,
  Tag,
  Form,
  Button,
  Input,
  Collapse,
  Pagination,
  Divider,
  message,
  Select,
  DatePicker
} from "antd";
import moment from 'moment';
import { getTableList, deleteItem, editItem } from "@/api/table";
import EditForm from "./components/editForm";
import AddForm from "./components/addForm";
const { Column } = Table;
const { Panel } = Collapse;
const { RangePicker } = DatePicker;

const mockData = [
  { id: 1, familyName: '家庭1', familyDes: 'testtest', member: ['周周'], doctor: '111', hushi: '222', zuli: '333', time: 1605785755000 },
]

class FamilyManagementComponent extends Component {
  _isMounted = false; // 这个变量是用来标志当前组件是否挂载
  state = {
    tableList: [],
    loading: false,
    total: 0,
    listQuery: {
      pageNumber: 1,
      pageSize: 10,
      familyName: "",
      servicePerson: "",
      dateRange: []
    },

    editModalVisible: false,
    editModalLoading: false,
    editModalKey: 100,
    editData: {
      id: 0,
      familyName: '',
      familyDes: ''
    },

    addModalVisible: false,
    addModalLoading: false
  };
  fetchData = () => {
    this.setState({ loading: true });
    getTableList({ page: 1, size: 10 }).then((response) => {
      this.setState({ loading: false });
      const tableList = mockData;
      const total = 1;
      if (this._isMounted) {
        this.setState({ tableList, total });
      }
    });
  };
  resetData = () => {
    this.setState({
      listQuery: {
        pageNumber: 1,
        pageSize: 10,
        familyName: "",
        servicePerson: "",
        dateRange: []
      }
    })

    this.fetchData();
  }
  componentDidMount() {
    this._isMounted = true;
    this.fetchData();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  filterFamilyNameChange = (e) => {
    let value = e.target.value
    this.setState((state) => ({
      listQuery: {
        ...state.listQuery,
        familyName: value,
      }
    }));
  };
  filterServicePersonChange = (value) => {
    this.setState((state) => ({
      listQuery: {
        ...state.listQuery,
        servicePerson: value,
      }
    }));
  };
  filterDateRangeChange = (dates, dateStrings) => {
    this.setState((state) => ({
      listQuery: {
        ...state.listQuery,
        dateRange: dates,
      }
    }));
  };
  changePage = (pageNumber, pageSize) => {
    this.setState(
      (state) => ({
        listQuery: {
          ...state.listQuery,
          pageNumber,
        },
      }),
      () => {
        this.fetchData();
      }
    );
  };
  changePageSize = (current, pageSize) => {
    this.setState(
      (state) => ({
        listQuery: {
          ...state.listQuery,
          pageNumber: 1,
          pageSize,
        },
      }),
      () => {
        this.fetchData();
      }
    );
  };
  handleDelete = (row) => {
    deleteItem({ id: row.id }).then(res => {
      message.success("删除成功")
      this.fetchData();
    })
  }
  // edit start
  handleEdit = (row) => {
    this.setState({
      editData: Object.assign({}, row),
      editModalVisible: true,
      editModalKey: `editmodal${this.state.editModalKey + 1}`
    });
  };

  handleEditOk = (values) => {
    console.log(values);
    this.setState({ editModalLoading: true, });
    setTimeout(() => {
      message.success("编辑成功!")
      this.setState({ editModalVisible: false, editModalLoading: false });
      this.fetchData();
    }, 2000);
  };

  handleEditCancel = _ => {
    this.setState({ editModalVisible: false });
  };
  // edit end
  // add start
  handleAdd = () => {
    this.setState({ addModalVisible: true });
  }

  handleAddOk = (values) => {
    console.log(values);
    this.setState({ addModalLoading: true, });
    setTimeout(() => {
      message.success("添加成功!")
      this.setState({ addModalVisible: false, addModalLoading: false });
      this.fetchData();
    }, 2000);
  }

  handleAddCancel = () => {
    this.setState({ addModalVisible: false });
  }
  //add end
  render() {
    return (
      <div className="app-container">
        <Collapse defaultActiveKey={["1"]}>
          <Panel header="操作" key="1">
            <Form layout="inline">
              <Form.Item label="家庭名称:">
                <Input value={this.state.listQuery.familyName} onChange={this.filterFamilyNameChange} />
              </Form.Item>
              <Form.Item label="服务人员:">
                <Select
                  value={this.state.listQuery.servicePerson}
                  style={{ width: 120 }}
                  onChange={this.filterServicePersonChange}>
                  <Select.Option value="">全部</Select.Option>
                  <Select.Option value="123">医生</Select.Option>
                  <Select.Option value="43">护士</Select.Option>
                  <Select.Option value="dra543ft">助理</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="录入时间:">
                <RangePicker
                  value={this.state.listQuery.dateRange}
                  onChange={this.filterDateRangeChange}
                  allowClear={false}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" onClick={this.fetchData}>
                  查询
                </Button>
              </Form.Item>
              <Form.Item>
                <Button type="default" onClick={this.resetData} >
                  重置
                </Button>
              </Form.Item>
              <Form.Item>
                <Button type="primary" onClick={this.handleAdd} >
                  添加
                </Button>
              </Form.Item>
            </Form>
          </Panel>
        </Collapse>
        <br />
        <Table
          bordered
          rowKey={(record) => record.id}
          dataSource={this.state.tableList}
          loading={this.state.loading}
          pagination={false}
        >
          <Column title="序号" dataIndex="id" key="id" width={80} align="center" />
          <Column title="家庭名称" dataIndex="familyName" key="familyName" align="center" />
          <Column title="家庭描述" dataIndex="familyDes" key="author" align="center" />
          <Column title="家庭成员" dataIndex="member" key="status" align="center" render={(status) => {
            return (
              <Tag key={status}>
                {status}
              </Tag>
            );
          }} />
          <Column title="服务医生" dataIndex="doctor" key="readings" align="center" />
          <Column title="服务护士" dataIndex="hushi" key="star" align="center" />
          <Column title="服务助理" dataIndex="zuli" key="date" align="center" />
          <Column title="录入时间" dataIndex="time" key="time" align="center" render={item => moment(item).format('YYYY-MM-DD HH:mm:ss')} />
          <Column title="操作" key="action" align="center" render={(text, row) => (
            <span>
              <Button type="link" onClick={this.handleEdit.bind(null, row)}>编辑</Button>
              <Button type="link" onClick={this.handleDelete.bind(null, row)}>家庭成员</Button>
              <Button type="link" onClick={this.handleDelete.bind(null, row)}>服务人员设置</Button>
            </span>
          )} />
        </Table>
        <br />
        <Pagination
          total={this.state.total}
          pageSizeOptions={["10", "20", "40"]}
          showTotal={(total) => `共${total}条数据`}
          onChange={this.changePage}
          current={this.state.listQuery.pageNumber}
          onShowSizeChange={this.changePageSize}
          showSizeChanger
          showQuickJumper
        />
            <EditForm
              key={this.state.editModalKey}
              editData={this.state.editData}
              visible={this.state.editModalVisible}
              confirmLoading={this.state.editModalLoading}
              onCancel={this.handleEditCancel}
              onOk={this.handleEditOk}
            /> 
        <AddForm
          visible={this.state.addModalVisible}
          confirmLoading={this.state.addModalLoading}
          onCancel={this.handleAddCancel}
          onOk={this.handleAddOk}
        />
      </div>
    );
  }
}

export default FamilyManagementComponent;
