import { cn } from '@/lib/utils'

describe('cn utility function', () => {
  it('should merge class names correctly', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2')
  })

  it('should handle conditional classes', () => {
    const condition = true
    expect(cn('base', condition && 'conditional')).toBe('base conditional')
  })

  it('should filter out falsy values', () => {
    expect(cn('class1', false && 'class2', null, undefined, 'class3')).toBe('class1 class3')
  })

  it('should merge tailwind classes correctly', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4')
  })

  it('should handle empty inputs', () => {
    expect(cn()).toBe('')
  })

  it('should handle single class', () => {
    expect(cn('single-class')).toBe('single-class')
  })

  it('should handle array inputs', () => {
    expect(cn(['class1', 'class2'])).toBe('class1 class2')
  })

  it('should handle nested arrays', () => {
    expect(cn(['class1', ['class2', 'class3']])).toBe('class1 class2 class3')
  })

  it('should handle object syntax from clsx', () => {
    expect(cn({ 'class1': true, 'class2': false, 'class3': true })).toBe('class1 class3')
  })

  it('should merge conflicting tailwind classes (last one wins)', () => {
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
  })

  it('should handle complex real-world example', () => {
    const isActive = true
    const isDisabled = false
    const result = cn(
      'px-4 py-2 rounded-md font-medium',
      isActive && 'bg-blue-500 text-white',
      isDisabled && 'opacity-50 cursor-not-allowed',
      'hover:bg-blue-600'
    )
    expect(result).toBe('px-4 py-2 rounded-md font-medium bg-blue-500 text-white hover:bg-blue-600')
  })

})
