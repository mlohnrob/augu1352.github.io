function renteformel(form) {
  let results = document.getElementById("results");

  let k_0 = form.k_0.value;

  let r = form.r.value;

  let n = form.n.value;

  let k_n = form.k_n.value;

  if (k_n == "" && k_0 != "" && r != "" && n != "") {
    n = Number(n);
    k_0 = Number(k_0);
    r = Number(r);
    k_n = k_0 * (1 + r) ** n;
    let k_n_node = document.createElement("li");
    let k_n_txt = document.createTextNode(`k_${n} = ${k_n}`);
    k_n_node.appendChild(k_n_txt);
    results.insertBefore(k_n_node, results.childNodes[0]);
  } else if (k_0 == "" && k_n != "" && r != "" && n != "") {
    k_n = Number(k_n);
    n = Number(n);
    r = Number(r);
    k_0 = k_n / (1 + r) ** n;
    let k_0_node = document.createElement("li");
    let k_0_txt = document.createTextNode(`k_0 = ${k_0}`);
    k_0_node.appendChild(k_0_txt);
    results.insertBefore(k_0_node, results.childNodes[0]);
  } else if (r == "" && k_n != "" && k_0 != "" && n != "") {
    k_n = Number(k_n);
    k_0 = Number(k_0);
    n = Number(n);
    r = (k_n / k_0) ** (1 / n) - 1;
    let r_node = document.createElement("li");
    let r_txt = document.createTextNode(`r = ${r}`);
    r_node.appendChild(r_txt);
    results.insertBefore(r_node, results.childNodes[0]);
  } else if (n == "" && k_n != "" && k_0 != "" && r != "") {
    k_n = Number(k_n);
    k_0 = Number(k_0);
    r = Number(r);
    n = Math.log(k_n / k_0) / Math.log(r + 1);
    let n_node = document.createElement("li");
    let n_txt = document.createTextNode(`n = ${n}`);
    n_node.appendChild(n_txt);
    results.insertBefore(n_node, results.childNodes[0]);
  }
}

function clearResults() {
  let results = document.getElementById("results");
  while (results.firstChild) {
    results.removeChild(results.firstChild);
  }
}
