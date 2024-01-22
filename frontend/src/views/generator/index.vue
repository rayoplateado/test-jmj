<script setup lang="ts">
import {ref} from 'vue'
import Button from '../../components/button/Button.vue'
import Field from '../../components/field/Field.vue'
import Input from '../../components/input/Input.vue'
import Datepicker from '../../components/datepicker/Datepicker.vue'
import {PostMetricActionHandler} from '../../action-handlers/metrics/PostMetricActionHandler'
import moment from 'moment'
import {NotificationType} from '../../models/notification/domain/NotificationType'
import {useNotificationStore} from '../../stores/notification/notificationStore'
import {Notification} from '../../models/notification/domain/Notification'

const timestamp = ref(moment().format('DD/MM/YYYY HH:mm'))
const name = ref('')
const value = ref(0)
const postMetricActionHandler = new PostMetricActionHandler()

const successNotification = () => {
  const notification: Notification = {
    id: crypto.randomUUID(),
    text: 'Element created successfuly',
    type: NotificationType.success,
  }

  useNotificationStore().addNotification(notification)
}

const submit = () => {
  const body = {
    created_at: moment(timestamp.value, 'DD/MM/YYY HH:mm').toISOString(),
    name: name.value,
    value: value.value,
  }

  postMetricActionHandler.handle(body).then(() => {
    name.value = ''
    value.value = 0.0
    successNotification()
  })
}
</script>

<template>
  <div class="p-8">
    <h1 class="mb-2">Generator</h1>
    <p>A seeder to create metrics.</p>
    <div
      class="flex flex-row mt-4 rounded-lg bg-gradient-to-b from-stone-100 via-stone-100 to-stone-300 py-8 px-4"
    >
      <Field class="basis-1/4 m-4">
        <template #label>Timestamp</template>
        <template #input>
          <Datepicker
            v-model="timestamp"
            :use-range="false"
            data-testid="timestamp"
          ></Datepicker>
        </template>
      </Field>
      <Field class="basis-1/4 m-4">
        <template #label>Name</template>
        <template #input>
          <Input v-model="name" placeholder="write a name" data-testid="name" />
        </template>
      </Field>
      <Field class="basis-1/4 m-4">
        <template #label>Value</template>
        <template #input>
          <Input
            v-model="value"
            placeholder="write a value"
            type="number"
            data-testid="value"
          />
        </template>
      </Field>
      <div class="basis-1/4">
        <Button
          class="m-10 px-20"
          type="primary"
          @click="submit()"
          data-testid="sumbit-button"
        >
          Create
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 1.5rem;
}
</style>
