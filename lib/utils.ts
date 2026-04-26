import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('pt-BR').format(d)
}

export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':')
  return `${hours}h${minutes}`
}

export function generateTimeSlots(
  start: string = '08:00',
  end: string = '20:00',
  interval: number = 30
): string[] {
  const slots: string[] = []
  const [startHour, startMin] = start.split(':').map(Number)
  const [endHour, endMin] = end.split(':').map(Number)
  
  let current = startHour * 60 + startMin
  const endMinutes = endHour * 60 + endMin
  
  while (current < endMinutes) {
    const hours = Math.floor(current / 60)
    const minutes = current % 60
    slots.push(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`)
    current += interval
  }
  
  return slots
}

export function isOverlapping(
  start1: string,
  duration1: number,
  start2: string,
  duration2: number
): boolean {
  const [h1, m1] = start1.split(':').map(Number)
  const [h2, m2] = start2.split(':').map(Number)
  
  const start1Min = h1 * 60 + m1
  const end1Min = start1Min + duration1
  const start2Min = h2 * 60 + m2
  const end2Min = start2Min + duration2
  
  return start1Min < end2Min && end1Min > start2Min
}