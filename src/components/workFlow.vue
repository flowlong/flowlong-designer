<template>
  <div class="affix-container">
    <sc-workflow
      class="workflow"
      v-model="data.nodeConfig" />
    <el-drawer
      v-model="drawer"
      size="500px"
      class="drawer"
      :append-to-body="true"
      :modal="false"
      :with-header="false">
      <div style="height: 100vh">
        <div style="padding: 1px; background-color: #3883fa">
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
          <el-button
            type="primary"
            plain
            @click="drawer = false">
            关闭弹窗
          </el-button>
        </div>
        <json-editor-vue
          class="editor"
          language="zh-CN"
          current-mode="view"
          v-model="data" />
      </div>
    </el-drawer>
    </div>
    <div style="position: absolute;z-index: 1;top: 20px;right: 50px">
      <el-button
          type="primary"
          @click="() => (drawer = true)">
        查看 JSON
      </el-button>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import useClipboard from 'vue-clipboard3'
import scWorkflow from '@/components/scWorkflow/index.vue'

const drawer = ref(false)

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
:root {
  --el-drawer-padding-primary: 0;
}

body {
  margin: 0;
}

.affix-container {
  display: flex;
  justify-content: center;
  height: 100vh;
  flex-direction: row-reverse;
}

.editor {
  width: 500px;
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

.el-drawer__body {
  padding: 0 !important;
}
</style>
