const time = [
  [
    [7, 0],
    [7, 45],
  ],
  [
    [7, 50],
    [8, 35],
  ],
  [
    [8, 49],
    [9, 25],
  ],
  [
    [9, 35],
    [10, 20],
  ],
  [
    [10, 25],
    [11, 10],
  ],
  [
    [11, 15],
    [12, 0],
  ],
  [
    [12, 30],
    [13, 15],
  ],
  [
    [13, 20],
    [14, 5],
  ],
  [
    [14, 10],
    [14, 55],
  ],
  [
    [15, 5],
    [15, 50],
  ],
  [
    [15, 55],
    [16, 40],
  ],
  [
    [16, 45],
    [17, 30],
  ],
  [
    [18, 0],
    [18, 45],
  ],
  [
    [18, 50],
    [18, 45],
  ],
  [
    [18, 50],
    [19, 45],
  ],
  [
    [19, 50],
    [20, 35],
  ],
]

export default function getLessonTime({
  date,
  lessons,
}: {
  date: string
  lessons: string
}) {
  const lessonsArr = lessons.split(",").map((item: string) => +item)
  const current = new Date(date)

  return {
    startAt: current.setHours(
      time[lessonsArr[0] - 1][0][0],
      time[lessonsArr[0] - 1][0][1]
    ),
    endAt: current.setHours(
      time[lessonsArr[lessonsArr.length - 1] - 1][1][0],
      time[lessonsArr[lessonsArr.length - 1] - 1][1][1]
    ),
  }
}
