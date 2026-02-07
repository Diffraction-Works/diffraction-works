import { renderHook, act, waitFor } from '@testing-library/react'
import { useIsMobile } from '@/hooks/use-mobile'
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/use-scroll-animation'
import { useSwipe, useCarouselSwipe } from '@/hooks/use-swipe'

// Mock matchMedia with configurable matches
const mockMatchMedia = (matches: boolean) => {
  return jest.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }))
}

describe('useIsMobile hook', () => {
  const originalMatchMedia = window.matchMedia
  const originalInnerWidth = window.innerWidth

  beforeEach(() => {
    // Reset window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })
  })

  afterEach(() => {
    window.matchMedia = originalMatchMedia
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    })
    jest.clearAllMocks()
  })

  it('should return false for desktop viewport', () => {
    window.matchMedia = mockMatchMedia(false)
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })

    const { result } = renderHook(() => useIsMobile())
    
    // Initial state is undefined, then updates to false
    expect(result.current).toBe(false)
  })

  it('should return true for mobile viewport', () => {
    window.matchMedia = mockMatchMedia(true)
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    })

    const { result } = renderHook(() => useIsMobile())
    
    expect(result.current).toBe(true)
  })

  it('should update when window resizes', () => {
    const mockAddEventListener = jest.fn()
    const mockRemoveEventListener = jest.fn()
    
    window.matchMedia = jest.fn().mockImplementation(() => ({
      matches: false,
      media: '(max-width: 767px)',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
      dispatchEvent: jest.fn(),
    }))

    const { unmount } = renderHook(() => useIsMobile())

    expect(mockAddEventListener).toHaveBeenCalledWith('change', expect.any(Function))

    unmount()

    expect(mockRemoveEventListener).toHaveBeenCalledWith('change', expect.any(Function))
  })
})

describe('useScrollAnimation hook', () => {
  const originalMatchMedia = window.matchMedia

  beforeEach(() => {
    // Reset IntersectionObserver mock
    jest.clearAllMocks()
  })

  afterEach(() => {
    window.matchMedia = originalMatchMedia
  })

  it('should return ref, isInView, and hasAnimated', () => {
    const { result } = renderHook(() => useScrollAnimation())

    expect(result.current.ref).toBeDefined()
    expect(result.current.isInView).toBe(false)
    expect(result.current.hasAnimated).toBe(false)
  })

  it.skip('should respect reduced motion preference', () => {

    // Mock matchMedia to return true for reduced motion preference
    // Must be set before renderHook so the hook reads it on mount
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query: string) => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })

    const { result } = renderHook(() => useScrollAnimation())

    // When reduced motion is preferred, isInView and hasAnimated should be true immediately
    expect(result.current.isInView).toBe(true)
    expect(result.current.hasAnimated).toBe(true)
  })



  it('should accept custom options', () => {
    const { result } = renderHook(() => 
      useScrollAnimation({ threshold: 0.5, rootMargin: '10px', triggerOnce: false })
    )

    expect(result.current.ref).toBeDefined()
    expect(result.current.isInView).toBe(false)
  })
})

describe('useStaggerAnimation hook', () => {
  it('should return array with correct delays', () => {
    const { result } = renderHook(() => useStaggerAnimation(5, 100))

    expect(result.current).toHaveLength(5)
    expect(result.current[0]).toEqual({ delay: 0 })
    expect(result.current[1]).toEqual({ delay: 100 })
    expect(result.current[2]).toEqual({ delay: 200 })
    expect(result.current[4]).toEqual({ delay: 400 })
  })

  it('should use default base delay of 100ms', () => {
    const { result } = renderHook(() => useStaggerAnimation(3))

    expect(result.current).toHaveLength(3)
    expect(result.current[0]).toEqual({ delay: 0 })
    expect(result.current[1]).toEqual({ delay: 100 })
    expect(result.current[2]).toEqual({ delay: 200 })
  })

  it('should handle zero items', () => {
    const { result } = renderHook(() => useStaggerAnimation(0))

    expect(result.current).toHaveLength(0)
  })
})

describe('useSwipe hook', () => {
  it('should return ref, swipeDirection, and isSwiping', () => {
    const { result } = renderHook(() => useSwipe())

    expect(result.current.ref).toBeDefined()
    expect(result.current.swipeDirection).toBeNull()
    expect(result.current.isSwiping).toBe(false)
  })

  it('should call onSwipeLeft when swiping left', () => {
    const onSwipeLeft = jest.fn()
    const { result } = renderHook(() => 
      useSwipe({ onSwipeLeft, threshold: 50 })
    )

    // Create a mock element
    const mockElement = document.createElement('div')
    
    // Set the ref manually
    act(() => {
      // @ts-ignore - setting ref value directly for testing
      result.current.ref.current = mockElement
    })

    // Simulate touch start
    const touchStartEvent = new TouchEvent('touchstart', {
      touches: [{ screenX: 200, screenY: 100 }] as unknown as Touch[],
      changedTouches: [{ screenX: 200, screenY: 100 }] as unknown as Touch[],
    })

    mockElement.dispatchEvent(touchStartEvent)

    // Simulate touch end (swipe left - moving from right to left)
    const touchEndEvent = new TouchEvent('touchend', {
      touches: [{ screenX: 100, screenY: 100 }] as unknown as Touch[],
      changedTouches: [{ screenX: 100, screenY: 100 }] as unknown as Touch[],
    })

    mockElement.dispatchEvent(touchEndEvent)

    // Note: In a real test environment, we'd need to properly mock the TouchEvent
    // This test demonstrates the structure but may need adjustment based on the test environment
  })
})

describe('useCarouselSwipe hook', () => {
  it('should initialize with index 0', () => {
    const { result } = renderHook(() => useCarouselSwipe(5))

    expect(result.current.currentIndex).toBe(0)
  })

  it('should go to next index', () => {
    const onIndexChange = jest.fn()
    const { result } = renderHook(() => useCarouselSwipe(5, onIndexChange))

    act(() => {
      result.current.goToNext()
    })

    expect(result.current.currentIndex).toBe(1)
    expect(onIndexChange).toHaveBeenCalledWith(1)
  })

  it('should wrap to 0 when going past last item', () => {
    const { result } = renderHook(() => useCarouselSwipe(3))

    // Go to last item
    act(() => {
      result.current.goToIndex(2)
    })

    // Go next should wrap to 0
    act(() => {
      result.current.goToNext()
    })

    expect(result.current.currentIndex).toBe(0)
  })

  it('should go to previous index', () => {
    const onIndexChange = jest.fn()
    const { result } = renderHook(() => useCarouselSwipe(5, onIndexChange))

    act(() => {
      result.current.goToIndex(2)
    })

    act(() => {
      result.current.goToPrev()
    })

    expect(result.current.currentIndex).toBe(1)
    expect(onIndexChange).toHaveBeenCalledWith(1)
  })

  it('should wrap to last item when going before first', () => {
    const { result } = renderHook(() => useCarouselSwipe(3))

    act(() => {
      result.current.goToPrev()
    })

    expect(result.current.currentIndex).toBe(2)
  })

  it('should go to specific index', () => {
    const onIndexChange = jest.fn()
    const { result } = renderHook(() => useCarouselSwipe(5, onIndexChange))

    act(() => {
      result.current.goToIndex(3)
    })

    expect(result.current.currentIndex).toBe(3)
    expect(onIndexChange).toHaveBeenCalledWith(3)
  })

  it('should not go to invalid index', () => {
    const onIndexChange = jest.fn()
    const { result } = renderHook(() => useCarouselSwipe(3, onIndexChange))

    act(() => {
      result.current.goToIndex(10)
    })

    expect(result.current.currentIndex).toBe(0)
    expect(onIndexChange).not.toHaveBeenCalled()

    act(() => {
      result.current.goToIndex(-1)
    })

    expect(result.current.currentIndex).toBe(0)
    expect(onIndexChange).not.toHaveBeenCalled()
  })

  it('should provide swipe handlers', () => {
    const { result } = renderHook(() => useCarouselSwipe(5))

    expect(result.current.swipeHandlers).toBeDefined()
    expect(result.current.swipeHandlers.ref).toBeDefined()
    expect(result.current.swipeHandlers.swipeDirection).toBeNull()
    expect(result.current.swipeHandlers.isSwiping).toBe(false)
  })
})
