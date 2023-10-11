<template>
  <div style="display: flex; justify-content: center; height: 100vh">
    <sc-workflow
      class="workflow"
      v-model="data.nodeConfig" />
    <div style="height: 100vh">
      <div style="display: flex; justify-content: flex-end; padding: 2px; background-color: #3883fa">
        <el-button
          type="primary"
          plain
          @click="copyParseJson">
          复制格式化后的 JSON
        </el-button>
        <el-button
          type="primary"
          plain
          @click="copyJson">
          复制压缩后的 JSON
        </el-button>
      </div>
      <json-editor-vue
        class="editor"
        language="zh-CN"
        current-mode="view"
        v-model="data" />
    </div>
  </div>
</template>

<script setup>
import useClipboard from 'vue-clipboard3'
import { ref } from 'vue'
import scWorkflow from '@/components/scWorkflow/index.vue'

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

const { toClipboard } = useClipboard()

const copyParseJson = async () => {
  await toClipboard(JSON.stringify(data.value, null, '  '))
}

const copyJson = async () => {
  await toClipboard(JSON.stringify(data.value))
}
</script>

<style>
body {
  margin: 0;
}

.editor {
  width: 700px;
  height: calc(100vh - 36px);
}

.editor .jsoneditor-poweredBy,
.editor .jsoneditor-transform,
.editor .jsoneditor-repair,
.editor .full-screen {
  display: none !important;
}

.workflow {
  padding: 10px;
  overflow-y: auto;
}

.jsoneditor-menu > button.jsoneditor-copy {
  background-position: -48px 0px;
}
</style>
