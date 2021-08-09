import { createMachine, InterpreterOptions } from 'xstate'
import { useActor, useInterpret } from 'xstate-vue2'
import authenticationMachine from '@/statemachines/AuthenticationMachine'

// TODO: refine these types (no any)
export interface StateMachineService {
  service:any,
  state: any,
  send: any
}

const interpretMachineToService = (machineDefinition: any) => {
  const interpretedMachine = useInterpret(
    machineDefinition,
    { devTools: true },
    (state) => {
      // subscribes to state changes
      console.log(state.value)
    })
  const { state, send } = useActor(interpretedMachine)
  const machineService: StateMachineService = {
    service: interpretedMachine,
    state: state,
    send: send
  }

  return machineService
}

export { interpretMachineToService }
