import { shallowMount } from '@vue/test-utils'
import ZapCalcPage from '@/components/ZapCalcPage'
import KeyboardKey from '@/components/KeyboardKey'
import Substraction from '@/types/Substraction'
import Addition from '@/types/Addition'

describe('KeyboardKey.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(KeyboardKey,{
      props: {
        value: 10,
        correct: false,
        showResult: false
      }
    })
    expect(wrapper.text()).toMatch('10')
  })
})

describe('Substraction', () => {
  it('stars = 1 for simple operation', () => {
    const op = new Substraction(1)
    op.digit1 = 79
    op.digit2 = 1
    expect(op.stars).toEqual(1)
  })
})

describe('Addition', () => {
  it('stars = 1 for simple operation', () => {
    const op = new Addition(1)
    op.digit1 = 79
    op.digit2 = 1
    expect(op.stars).toEqual(1)
  })
})
