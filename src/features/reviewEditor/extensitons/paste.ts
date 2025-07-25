export const transformPreLineHTML = (html: string): string => {
  // 1. ペーストされたHTMLを一時的なコンテナ要素に挿入する
  const container = document.createElement("div");
  container.innerHTML = html;

  // 2. getComputedStyleでスタイルを正確に取得するため、一時的にDOMツリーに追加する
  container.style.position = "fixed";
  container.style.left = "-9999px";
  container.style.top = "-9999px";
  document.body.appendChild(container);

  // 3. 改行を処理すべき要素を収集する
  const elementsToProcess: Element[] = [];
  const allElements = container.querySelectorAll("*");
  allElements.forEach((el) => {
    const style = window.getComputedStyle(el);
    if (style.whiteSpace === "pre-line" || style.whiteSpace === "pre-wrap") {
      elementsToProcess.push(el);
    }
  });

  // 4. 対象要素内の改行コード(\n)を<br>タグに置換する
  elementsToProcess.forEach((el) => {
    el.innerHTML = el.innerHTML.replace(/\r\n|\r|\n/g, "<br>");
  });

  // 5. 処理後のHTMLを取得
  const processedHTML = container.innerHTML;

  // 6. 一時的なコンテナをDOMツリーから削除
  document.body.removeChild(container);

  return processedHTML;
};
