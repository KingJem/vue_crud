<template>


    <div class="table">
        <div class="head">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-input v-model="userInfo.name" placeholder="请输入姓名"/>

                </el-col>
                <el-col :span="6">
                    <el-input v-model="userInfo.gender" placeholder="请输入性别"/>

                </el-col>

                <el-col :span="6">
                    <el-input v-model="userInfo.phone" placeholder="请输入电话号码"/>

                </el-col>

                <el-col :span="6">

                    <el-date-picker
                            v-model="userInfo.brithday"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-col>


                <el-button type="primary" class="addBtn" @click="addUser" icon="el-icon-edit"/>


            </el-row>


        </div>

        <div class="body">
            <el-table
                    :data="tableData"
                    style="width: 100%">
                <!--                <el-table-column-->
                <!--                        prop="gender"-->
                <!--                        type="index"-->
                <!--                        label="序号"-->
                <!--                        width="180">-->

                <!--                </el-table-column>-->

                <el-table-column
                        label="序号"
                        width="180">
                    <template slot-scope="scope">
                        {{ scope.$index+1}}
                    </template>

                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名"
                        width="180"/>
                <el-table-column
                        prop="gender"
                        label="性别">
                </el-table-column>
                <el-table-column
                        prop="phone"
                        label="电话号码">
                </el-table-column>

                <el-table-column
                        prop="date"
                        type="string"
                        label="生日">
                </el-table-column>

                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" @click="editUser(scope.row,scope.$index)" circle/>
                        <el-button type="danger" icon="el-icon-delete" @click="deleteUser(scope.$index)" circle/>
                    </template>


                </el-table-column>
            </el-table>
        </div>

        <div class="dig">
            <el-dialog
                    title="编辑用户信息"
                    :visible.sync="dialogVisible"
                    width="30%"
                    :before-close="handleClose">

                <div>
                    <el-form ref="form" :model="editObj" label-width="80px">
                        <el-form-item label="姓名">
                            <el-input v-model="editObj.name"></el-input>
                        </el-form-item>

                        <el-form-item label="性别">
                            <el-input v-model="editObj.gender"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号码">
                            <el-input v-model="editObj.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="生日">
                            <el-date-picker v-model="editObj.birthday" type="date" format="yyyy 年 MM 月 dd 日"
                                            value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
                        </el-form-item>


                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
                </span>
            </el-dialog>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Table",
        data() {
            return {
                userInfo: {
                    name: '',
                    gender: '',
                    phone: '',
                    brithday: ''
                },
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    gender: '男',
                    phone: '1883750441'
                }],
                dialogVisible: false,
                editObj: {
                    name: '',
                    gender: '',
                    phone: '',
                    brithday: ''
                },
                userIndex: 0
            }
        },
        methods: {
            warning(msg, type = 'warning') {
                this.$message({
                    message: msg,
                    type: type,
                });
            },
            check(userInfo) {
                if (!userInfo.name) {
                    this.warning("请输入姓名");
                    return 0

                }
                if (!userInfo.gender) {
                    this.warning("请输入性别");
                    return 0;
                }
                if (!userInfo.phone) {
                    this.warning("请输入电话");
                    return 0;
                }
                if (/^1[123456789][123456789]d{8}/.test(userInfo.phone)) {
                    this.warning("请输入正确的电话号码");
                    return 0;
                }
                if (!userInfo.brithday) {
                    this.warning("请输入生日");
                    return 0;
                }

            },
            addUser() {
                const code = this.check(this.userInfo);
                if (code == 0) {
                    return
                }
                this.tableData.push(this.userInfo);
                this.userInfo = {
                    name: '',
                    gender: '',
                    phone: '',
                    brithday: ''
                }
            },
            init() {
                this._userInfo = this.userInfo;
                console.log(this._userInfo)
            },
            deleteUser(index) {
                this.$confirm('确认删除？')
                    // eslint-disable-next-line no-undef,no-unused-vars
                    .then(_ => {
                        // eslint-disable-next-line no-undef
                        done();
                    })
                    // eslint-disable-next-line no-unused-vars
                    .catch(_ => {
                    });
                this.tableData.splice(index, 1)
            },

            editUser(row, index) {
                console.log(row)
                this.dialogVisible = true
                this.editObj = {
                    name: row.name,
                    gender: row.gender,
                    phone: row.phone,
                    brithday: row.brithday
                }
                this.userIndex = index
            },
            handleClose() {
                this.dialogVisible = false
            },
            confirm() {
                this.dialogVisible = false
                // this.tableData[this.userIndex].$set(this.editObj)
                this.$set(this.tableData, this.userIndex, this.editObj)
            }
        },

        mounted() {
            this.init()
        }
    }
</script>

<style scoped>
    .addBtn {
        margin: 20px 0;
        width: 80%;
    }

</style>