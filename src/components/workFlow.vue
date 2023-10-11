<template>
  <el-container>
    <el-header height="32">
      <div style="float: right">
        <el-button
          type="primary"
          @click="() => (dialogUpdate = true)">
          Update
        </el-button>
      </div>
    </el-header>
    <el-main>
      <div style="display: flex; justify-content: center">
        <sc-workflow v-model="data.nodeConfig" />
        <json-viewer
          :value="data"
          :expand-depth="5"
          copyable
          sort />
      </div>
    </el-main>
  </el-container>
  <el-dialog
    v-model="dialogUpdate"
    title="修改流程">
    <el-input
      :autosize="{ maxRows: 20 }"
      v-model="text"
      type="textarea" />
    <template #footer>
      <span class="dialog-footer">
        <el-button
          type="primary"
          @click="onInput">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import scWorkflow from '@/components/scWorkflow/index.vue'

const dialogUpdate = ref(false)

const data = ref({
  id: 1,
  name: '请假审批',
  nodeConfig: {
    nodeName: '发起人',
    type: 0,
    nodeRoleList: [],
    childNode: {
      nodeName: '条件路由',
      type: 4,
      conditionNodes: [
        {
          nodeName: '长期',
          type: 3,
          priorityLevel: 1,
          conditionMode: 1,
          conditionList: [
            {
              label: '请假天数',
              field: 'day',
              operator: '>',
              value: '7'
            }
          ],
          childNode: {
            nodeName: '领导审批',
            type: 1,
            setType: 1,
            nodeUserList: [
              {
                id: '360000197302144442',
                name: '何敏'
              }
            ],
            nodeRoleList: [],
            examineLevel: 1,
            directorLevel: 1,
            selectMode: 1,
            termAuto: false,
            term: 0,
            termMode: 1,
            examineMode: 1,
            directorMode: 0
          }
        },
        {
          nodeName: '短期',
          type: 3,
          priorityLevel: 2,
          conditionMode: 1,
          conditionList: [],
          childNode: {
            nodeName: '直接主管审批',
            type: 1,
            setType: 2,
            nodeUserList: [],
            nodeRoleList: [],
            examineLevel: 1,
            directorLevel: 1,
            selectMode: 1,
            termAuto: false,
            term: 0,
            termMode: 1,
            examineMode: 1,
            directorMode: 0
          }
        }
      ],
      childNode: {
        nodeName: '抄送人',
        type: 2,
        userSelectFlag: true,
        nodeUserList: [
          {
            id: '220000200908305857',
            name: '何秀英'
          }
        ]
      }
    }
  }
})

const text = ref(JSON.stringify(data.value, null, '  '))

const onInput = () => {
  try {
    data.value = JSON.parse(text.value)
    dialogUpdate.value = false
    ElMessage({
      message: '修改成功',
      type: 'success'
    })
  } catch {
    ElMessage.error('JSON 格式有误')
  }
}
</script>

<style></style>
