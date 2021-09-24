import * as cheer from "cheerio"

export default function parseHiddenInput($: ReturnType<typeof cheer.load>) {
  const result = {}
  const hiddenInputs = $("form").find("input[type='hidden']")
  hiddenInputs.each((i, e) => (result[$(e).attr("name")] = $(e).val()))
  return result
}
