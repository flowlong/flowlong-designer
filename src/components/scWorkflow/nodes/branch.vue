<template>
  <div class="branch-wrap">
    <div class="branch-box-wrap">
      <div class="branch-box">
        <el-button
          class="add-branch"
          type="success"
          plain
          round
          @click="addTerm">
          添加条件
        </el-button>
        <div
          class="col-box"
          v-for="(item, index) in nodeConfig.conditionNodes"
          :key="index">
          <div class="condition-node">
            <div class="condition-node-box">
              <div
                class="auto-judge"
                @click="show(index)">
                <div
                  class="sort-left"
                  v-if="index != 0"
                  @click.stop="arrTransfer(index, -1)">
                  <el-icon><el-icon-arrow-left /></el-icon>
                </div>
                <div class="title">
                  <span class="node-title">{{ item.nodeName }}</span>
                  <span class="priority-title">优先级{{ item.priorityLevel }}</span>
                  <el-icon
                    class="close"
                    @click.stop="delTerm(index)">
                    <el-icon-close />
                  </el-icon>
                </div>
                <div class="content">
                  <span v-if="toText(nodeConfig, index)">{{ toText(nodeConfig, index) }}</span>
                  <span
                    v-else
                    class="placeholder">
                    请设置条件
                  </span>
                </div>
                <div
                  class="sort-right"
                  v-if="index != nodeConfig.conditionNodes.length - 1"
                  @click.stop="arrTransfer(index)">
                  <el-icon><el-icon-arrow-right /></el-icon>
                </div>
              </div>
              <add-node v-model="item.childNode"></add-node>
            </div>
          </div>
          <slot
            v-if="item.childNode"
            :node="item"></slot>
          <div
            class="top-left-cover-line"
            v-if="index == 0"></div>
          <div
            class="bottom-left-cover-line"
            v-if="index == 0"></div>
          <div
            class="top-right-cover-line"
            v-if="index == nodeConfig.conditionNodes.length - 1"></div>
          <div
            class="bottom-right-cover-line"
            v-if="index == nodeConfig.conditionNodes.length - 1"></div>
        </div>
      </div>
      <add-node v-model="nodeConfig.childNode"></add-node>
    </div>
    <el-drawer
      title="条件设置"
      v-model="drawer"
      destroy-on-close
      append-to-body
      :size="600">
      <template #header>
        <div class="node-wrap-drawer__title">
          <label
            @click="editTitle"
            v-if="!isEditTitle">
            {{ form.nodeName }}
            <div @click="rmConditionGroup(conditionGroup)">
              <el-icon class="node-wrap-drawer__title-edit"><el-icon-edit /></el-icon>
            </div>
          </label>
          <el-input
            v-if="isEditTitle"
            ref="nodeTitle"
            v-model="form.nodeName"
            clearable
            @blur="saveTitle"
            @keyup.enter="saveTitle"></el-input>
        </div>
      </template>
      <el-container>
        <el-main style="padding: 0 20px 20px 20px">
          <div class="top-tips">满足以下条件时进入当前分支</div>
          <template v-for="(conditionGroup, conditionGroupIdx) in form.conditionList">
            <div
              class="or-branch-link-tip"
              v-if="conditionGroupIdx != 0">
              或满足
            </div>
            <div class="condition-group-editor">
              <div class="header">
                <span>条件组 {{ conditionGroupIdx + 1 }}</span>
                <div @click="deleteConditionGroup(conditionGroupIdx)">
                  <el-icon class="branch-delete-icon"><el-icon-delete /></el-icon>
                </div>
              </div>

              <div class="main-content">
                <!-- 单个条件 -->
                <div class="condition-content-box cell-box">
                  <div>描述</div>
                  <div>条件字段</div>
                  <div>运算符</div>
                  <div>值</div>
                </div>
                <div
                  class="condition-content"
                  v-for="(condition, idx) in conditionGroup">
                  <div class="condition-relation">
                    <span>{{ idx == 0 ? '当' : '且' }}</span>
                    <div @click="deleteConditionList(conditionGroup, idx)">
                      <el-icon class="branch-delete-icon"><el-icon-delete /></el-icon>
                    </div>
                  </div>
                  <div class="condition-content">
                    <div class="condition-content-box">
                      <el-input
                        v-model="condition.label"
                        placeholder="描述" />
                      <el-input
                        v-model="condition.field"
                        placeholder="条件字段" />
                      <el-select
                        v-model="condition.operator"
                        placeholder="Select">
                        <el-option
                          label="等于"
                          value="="></el-option>
                        <el-option
                          label="不等于"
                          value="!="></el-option>
                        <el-option
                          label="大于"
                          value=">"></el-option>
                        <el-option
                          label="大于等于"
                          value=">="></el-option>
                        <el-option
                          label="小于"
                          value="<"></el-option>
                        <el-option
                          label="小于等于"
                          value="<="></el-option>
                        <el-option
                          label="包含"
                          value="include"></el-option>
                        <el-option
                          label="不包含"
                          value="notinclude"></el-option>
                      </el-select>
                      <el-input
                        v-model="condition.value"
                        placeholder="值" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="sub-content">
                <el-button
                  link
                  type="primary"
                  @click="addConditionList(conditionGroup)"
                  icon="el-icon-plus">
                  添加条件
                </el-button>
              </div>
            </div>
          </template>
          <el-button
            style="width: 100%"
            type="info"
            icon="el-icon-plus"
            text
            bg
            @click="addConditionGroup">
            添加条件组
          </el-button>
        </el-main>
        <el-footer>
          <el-button
            type="primary"
            @click="save">
            保存
          </el-button>
          <el-button @click="drawer = false">取消</el-button>
        </el-footer>
      </el-container>
    </el-drawer>
  </div>
</template>

<script>
import addNode from './addNode.vue'

export default {
  props: {
    modelValue: { type: Object, default: () => {} }
  },
  components: {
    addNode
  },
  data() {
    return {
      nodeConfig: {},
      drawer: false,
      isEditTitle: false,
      index: 0,
      form: {}
    }
  },
  watch: {
    modelValue() {
      this.nodeConfig = this.modelValue
    }
  },
  mounted() {
    this.nodeConfig = this.modelValue
  },
  methods: {
    show(index) {
      this.index = index
      this.form = {}
      this.form = JSON.parse(JSON.stringify(this.nodeConfig.conditionNodes[index]))
      this.drawer = true
    },
    editTitle() {
      this.isEditTitle = true
      this.$nextTick(() => {
        this.$refs.nodeTitle.focus()
      })
    },
    saveTitle() {
      this.isEditTitle = false
    },
    save() {
      this.nodeConfig.conditionNodes[this.index] = this.form
      this.$emit('update:modelValue', this.nodeConfig)
      this.drawer = false
    },
    addTerm() {
      let len = this.nodeConfig.conditionNodes.length + 1
      this.nodeConfig.conditionNodes.push({
        nodeName: '条件' + len,
        type: 3,
        priorityLevel: len,
        conditionMode: 1,
        conditionList: []
      })
    },
    delTerm(index) {
      this.nodeConfig.conditionNodes.splice(index, 1)
      if (this.nodeConfig.conditionNodes.length == 1) {
        if (this.nodeConfig.childNode) {
          if (this.nodeConfig.conditionNodes[0].childNode) {
            this.reData(this.nodeConfig.conditionNodes[0].childNode, this.nodeConfig.childNode)
          } else {
            this.nodeConfig.conditionNodes[0].childNode = this.nodeConfig.childNode
          }
        }
        this.$emit('update:modelValue', this.nodeConfig.conditionNodes[0].childNode)
      }
    },
    reData(data, addData) {
      if (!data.childNode) {
        data.childNode = addData
      } else {
        this.reData(data.childNode, addData)
      }
    },
    arrTransfer(index, type = 1) {
      this.nodeConfig.conditionNodes[index] = this.nodeConfig.conditionNodes.splice(index + type, 1, this.nodeConfig.conditionNodes[index])[0]
      this.nodeConfig.conditionNodes.map((item, index) => {
        item.priorityLevel = index + 1
      })
      this.$emit('update:modelValue', this.nodeConfig)
    },
    addConditionList(conditionList) {
      conditionList.push({
        label: '',
        field: '',
        operator: '=',
        value: ''
      })
    },
    deleteConditionList(conditionList, index) {
      conditionList.splice(index, 1)
    },
    addConditionGroup() {
      this.addConditionList(this.form.conditionList[this.form.conditionList.push([]) - 1])
    },
    deleteConditionGroup(index) {
      this.form.conditionList.splice(index, 1)
    },
    toText(nodeConfig, index) {
      var { conditionList } = nodeConfig.conditionNodes[index]
      if (conditionList && conditionList.length == 1) {
        const text = conditionList.map((conditionGroup) => conditionGroup.map((item) => `${item.label}${item.operator}${item.value}`)).join(' 和 ')
        return text
      } else if (conditionList && conditionList.length > 1) {
        return conditionList.length + '个条件，或满足'
      } else {
        if (index == nodeConfig.conditionNodes.length - 1) {
          return '其他条件进入此流程'
        } else {
          return false
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.top-tips {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  color: #646a73;
}

.or-branch-link-tip {
  margin: 10px 0;
  color: #646a73;
}

.condition-group-editor {
  user-select: none;
  border-radius: 4px;
  border: 1px solid #e4e5e7;
  position: relative;
  margin-bottom: 16px;

  .branch-delete-icon {
    font-size: 18px;
  }

  .header {
    background-color: #f4f6f8;
    padding: 0 12px;
    font-size: 14px;
    color: #171e31;
    height: 36px;
    display: flex;
    align-items: center;

    span {
      flex: 1;
    }
  }

  .main-content {
    padding: 0 12px;

    .condition-relation {
      color: #9ca2a9;
      display: flex;
      align-items: center;
      height: 36px;
      display: flex;
      justify-content: space-between;
      padding: 0 2px;
    }

    .condition-content-box {
      display: flex;
      justify-content: space-between;
      align-items: center;

      div {
        width: 100%;
        min-width: 120px;
      }

      div:not(:first-child) {
        margin-left: 16px;
      }
    }

    .cell-box {
      div {
        padding: 16px 0;
        width: 100%;
        min-width: 120px;
        color: #909399;
        font-size: 14px;
        font-weight: 600;
        text-align: center;
      }
    }

    .condition-content {
      display: flex;
      flex-direction: column;

      :deep(.el-input__wrapper) {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }

      .content {
        flex: 1;
        padding: 0 0 4px 0;
        display: flex;
        align-items: center;
        min-height: 31.6px;
        flex-wrap: wrap;
      }
    }
  }

  .sub-content {
    padding: 12px;
  }
}
</style>
