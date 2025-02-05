import { Cookies } from "quasar";
// import decodeJWT from "jwt-decode";

export const empty = function (arg) {
  if (isDate(arg)) return false;

  return (
    arg === null ||
    arg === undefined ||
    arg === "" ||
    isArrAndEmpty(arg) ||
    isObjAndEmpty(arg)
  );
};

export const isArrAndEmpty = function (arg) {
  return isArr(arg) && arrEmpty(arg);
};

export const isArr = function (arg) {
  return Array.isArray(arg);
};

// For performance, this method does not check if `arr` is really an array.
// Use `isArr` before calling this method, to check if `arr` is really an array.
export const arrEmpty = function (arr) {
  return arr.length === 0;
};

export const isObjAndEmpty = function (arg) {
  return isObj(arg) && objEmpty(arg);
};

export const isObj = function (arg) {
  // Date, Array and null are considered object in JS, but should not be.
  return (
    typeof arg === "object" &&
    !isDate(arg) &&
    !Array.isArray(arg) &&
    arg !== null
  );
};

export const isDate = function (arg) {
  return Object.prototype.toString.call(arg) === "[object Date]";
};

// For performance, this method does not check if `obj` is really an object.
// Use `isObj` before calling this method, to check if `obj` is really an object.
export const objEmpty = function (obj) {
  return Object.keys(obj).length === 0;
};

export const isStr = function (arg) {
  return typeof arg === "string";
};

export const isPrimitive = function (val) {
  return (typeof val !== "object" && typeof val !== "function") || val === null;
};

export const isFlat = function (obj) {
  if (isPrimitive(obj)) throw "`obj` should not be a primitive.";

  for (const key in obj) {
    if (!isPrimitive(obj[key])) return false;
  }

  return true;
};

export const buildHashTable = function (
  arr,
  keyProp = "key",
  valueProp = null
) {
  if (arr == null || !Array.isArray(arr))
    throw "`arr` argument is required and should be an array.";

  // If valueProp is not supplied, whole item will be the value.
  // To avoid headache, supply only array of FLAT objects to the `arr` argument.
  return arr.reduce((map, item) => {
    map[item[keyProp]] = valueProp === null ? { ...item } : item[valueProp];
    return map;
  }, {});
};

export const buildBreadcrumbs = function (
  node,
  hash_table,
  parent_key = "parent_key"
) {
  if (empty(node) || empty(hash_table)) throw "Incomplete arguments.";

  if (typeof node !== "object" || Array.isArray(node))
    throw "`node` argument should be an object.";
  if (typeof hash_table !== "object" || Array.isArray(hash_table))
    throw "`hash_table` argument should be an object.";

  let breadcrumbs = [];
  let parent_node = hash_table[node[parent_key]] ?? null;

  while (parent_node) {
    breadcrumbs.unshift(parent_node.name);

    // Nodes which parent does not exist in the group will be considered root nodes
    if (parent_node[parent_key] && hash_table[parent_node[parent_key]]) {
      parent_node = hash_table[parent_node[parent_key]];
      continue;
    }

    parent_node = null;
  }

  return breadcrumbs;
};

export const generateEntityCode = function (entityName) {
  return entityName.replace(/[aeiou\s\W]/gi, "").toLowerCase();
};

export const cloneArrOfObj = function (arr) {
  // Shallow clone only, make sure objects in array are all flat
  return arr.map((obj) => ({ ...obj }));
};

export const delay = function (ms) {
  return new Promise((res) => setTimeout(() => res(), ms));
};

export const buildTree = function (arr, nodeKey = "", parentNodeKey = "") {
  if (nodeKey === "" || parentNodeKey === "")
    throw "buildTree: `nodeKey` and `parentNodeKey` arguments are required.";

  const hashTable = {};
  const tree = [];

  arr.forEach((node) => (hashTable[node[nodeKey]] = { ...node, children: [] }));

  arr.forEach((node) => {
    if (node[parentNodeKey] && hashTable[node[parentNodeKey]]) {
      hashTable[node[parentNodeKey]].children.push(hashTable[node[nodeKey]]);
    } else {
      tree.push(hashTable[node[nodeKey]]);
    }
  });

  return tree;
};

export const getTreeNodes = (val) => {
  const visited = [];
  const toVisit = [val];

  while (toVisit.length > 0) {
    const node = toVisit.shift();

    visited.push(node);

    if (node.children && node.children.length > 0) {
      for (const child of node.children) {
        toVisit.push(child);
      }
    }
  }

  return visited;
};

export const getTreeLeaves = (val) => {
  const visited = [];
  const toVisit = [val];

  while (toVisit.length > 0) {
    const node = toVisit.shift();

    if (!node.children || node.children.length === 0) {
      visited.push(node);
    } else {
      for (const child of node.children) {
        toVisit.push(child);
      }
    }
  }

  return visited;
};

// Limits and adds ellipsis to a string.
export const addEllipsis = (str, limit) => {
  if (limit < 3) limit = 3;

  if (str.length > limit) {
    return str.substring(0, limit - 3) + "...";
  }

  return str;
};

// Renders a one-liner presentable text from a FLAT array or object
// IMPORTANT: Make sure that the arg is an object or an array before calling this function
export const presentifyObj = function (arg, multiline = false) {
  let arr = arg;

  if (isObj(arr)) {
    arr = [];

    for (const key in arg) {
      arr.push(`${key}: ${arg[key]}`);
    }
  }

  const delimiter = multiline ? "\n" : ", ";

  return arr.join(delimiter);
};

// Returns a one-liner presentable text from a primitive, FLAT array or FLAT object
export const presentify = function (arg) {
  if (arg === undefined || arg === null || arg === "") return "";
  if (typeof arg === "function") throw "`arg` should not be a function";

  if (isObj(arg) || isArr(arg)) {
    if (!isFlat(arg))
      throw "`arg` when an object or an array, should be shallow or flat.";

    return presentifyObj(arg);
  }

  return arg;
};

export const stringifyHWBMI = (val) => {
  return `Height: ${val.height}${val.heightUnitCode}, Weight: ${val.weight}${val.weightUnitCode}, BMI: ${val.bmi}`;
};

export const stringifyFieldValue = (
  fieldValue,
  fieldType = "default",
  multiliner = false
) => {
  const stringifiersMap = {
    default: treeToStr,
    diag: (val) => {
      return stringifyDiagnostic(val, false, true, "\n\n", true);
    },
    diagsselect: (val) => {
      if (!val) return "";

      if (isStr(val)) return val;

      if (isArr(val))
        return val
          .map((diag) => stringifyDiagnostic(diag.value))
          .join(multiliner ? "\n\n" : ", ");
    },
    wardcourse: (val) => {
      sortStringArr(val, "date");

      return val
        .map((course) => `${course.date}: ${course.note}`)
        .join(multiliner ? "\n\n" : ", ");
    },
    multitoggle: (val) => {
      return val
        .map((toggle) => stringifyToggleFieldValue(toggle))
        .join(multiliner ? "\n" : ", ");
    },
    hwbmi: stringifyHWBMI,
    sketch: () => "[Sketch]",
  };

  const stringifier = stringifiersMap[fieldType] ?? stringifiersMap.default;

  return stringifier(fieldValue);
};

// Renders a delimited string from a primitive, array or an object (nested or flat) using DFS
export const treeToStr = (val, leafDelimiter = ", ") => {
  if (empty(val)) return "";

  const visited = [];
  const toVisit = [val];

  while (toVisit.length > 0) {
    const node = toVisit.shift();

    // Omit null and undefined nodes
    if (empty(node)) continue;

    if (isPrimitive(node)) {
      visited.push(node);
    } else if ((isObj(node) || isArr(node)) && isFlat(node)) {
      // Omit null and undefined nodes
      if (node !== null && node !== undefined) {
        let str = "";

        // for "value and label" data
        if (!empty(node.value) && !empty(node.label)) {
          str = `(${
            typeof node.value === "string"
              ? node.value.toUpperCase()
              : node.value
          }) ${node.label}`;
        } else {
          str = presentify(node);
        }

        visited.push(str);
      }
    } else {
      for (const key in node) {
        toVisit.unshift(node[key]);
      }
    }
  }

  return visited.join(leafDelimiter);
};

export const treeToMultiLinerStr = function (
  tree,
  indentSize = 4,
  indentChar = " ",
  bulletChar = "•"
) {
  if (!isObj(tree)) throw "`tree` should be an object.";

  const indent = Array(indentSize).fill(indentChar).join("");
  const result = [];
  const toVisit = [
    {
      ...tree,
      indent: "",
    },
  ];

  while (toVisit.length > 0) {
    const node = toVisit.shift();

    // Add bullet to the 2nd level nodes
    let bullet = node.indent === indent ? bulletChar : "";

    result.push(
      `${node.indent}${bullet} ${node.label}: ${presentify(node.value)}`
    );

    if (!empty(node.children)) {
      toVisit.unshift(
        ...node.children.map((n) => {
          n["indent"] = node.indent + indent;
          return n;
        })
      );
    }
  }

  return result.join("\n");
};

export const multiLineToOneLine = (str) => {
  return str.replace(/[\n\r]+/g, ", ");
};

export const stringifyDiagnostic = (
  diagnostic,
  limitText = false,
  multiline = false,
  multiLineDelimiter = "\n\n",
  labelVisible = false
) => {
  // For backward compatibility
  if (isStr(diagnostic)) return multiLineToOneLine(diagnostic);

  const diagStrArr = [];

  const diagDate = diagnostic.date;
  const diagName = diagnostic.label;
  let diagOthers = diagnostic.others ?? "";
  let diagRemarks = diagnostic.remarks ?? "";
  // const diagCreatedBy = diagnostic.createdBy;

  if (!diagnostic.children) diagnostic["children"] = [];

  let diagValues = diagnostic.children
    .map((v) => {
      let result = "";
      let refRange = "";
      let metricUnit = "";

      for (const child of v.children) {
        const childVal = limitText ? addEllipsis(child.value, 50) : child.value;

        if (child.label === "Reference Range") {
          refRange = childVal ? " (" + childVal : "";
        } else if (child.label === "Unit") {
          metricUnit = childVal ? " " + childVal : "";
        } else if (child.label === "Value") {
          result = childVal;
        }
      }

      if (refRange) {
        if (metricUnit) refRange += metricUnit + ")";
        else refRange += ")";
      }

      return `${v.label}: ${result}${metricUnit}${refRange}`;
    })
    .join(multiline ? "\n" : ", ");

  if (multiline === false) {
    diagValues = multiLineToOneLine(diagValues);
    diagOthers = multiLineToOneLine(diagOthers);
    diagRemarks = multiLineToOneLine(diagRemarks);
  } else {
    diagValues = diagValues ? "\n" + diagValues : "";
    diagOthers = diagOthers ? "\n" + diagOthers : "";
    diagRemarks = diagRemarks ? "\n" + diagRemarks : "";
  }

  if (!empty(diagDate))
    diagStrArr.push(labelVisible ? "Date: " + diagDate : diagDate);

  if (!empty(diagName))
    diagStrArr.push(labelVisible ? "Diagnostic: " + diagName : diagName);

  if (!empty(diagValues))
    diagStrArr.push(
      labelVisible ? "Diagnostic Params: " + diagValues : diagValues
    );

  if (!empty(diagOthers))
    diagStrArr.push(labelVisible ? "Others: " + diagOthers : diagOthers);

  if (!empty(diagRemarks))
    diagStrArr.push(labelVisible ? "Remarks: " + diagRemarks : diagRemarks);

  // if (!empty(diagCreatedBy)) diagStrArr.push(diagCreatedBy);

  return diagStrArr.join(multiline ? multiLineDelimiter : " | ");
};

export const stringifyDiagnosticOrder = (diagnostic) => {
  return `${diagnostic.label} (${diagnostic.timing}) ${
    diagnostic.remarks ? " -- " + diagnostic.remarks : ""
  }`;
};

export const formatDate = function (dateDetails = null) {
  // dateDetails.date can be a JS date or an ISO date string
  if (!dateDetails || !dateDetails.date) return "";

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const date = isDate(dateDetails.date)
    ? dateDetails.date
    : new Date(dateDetails.date);

  const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
  const month = new Intl.DateTimeFormat("en", {
    month: dateDetails.longMonth !== undefined ? "long" : "short",
  }).format(date);
  const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
  let minute = date.getMinutes();
  let hour = date.getHours();
  const ampm = hour > 11 ? "PM" : "AM";

  if (minute < 10) minute = "0" + minute;
  if (hour > 12) hour -= 12;

  const time = `${hour}:${minute}${ampm}`;
  const dayName = days[date.getDay()];

  if (dateDetails.withDayName)
    return `${dayName.toUpperCase()}, ${month.toUpperCase()} ${day}, ${year} ${time}`;
  else if (dateDetails.dateOnly)
    return `${month.toUpperCase()} ${day}, ${year}`;

  return `${month.toUpperCase()} ${day}, ${year} ${time} `;
};

export const req = async function (
  method = "get",
  url,
  accessToken = null,
  payload,
  vuexContext
) {
  if (empty(url) || empty(vuexContext))
    throw "`url` and `vuexContext` are required.";

  const opts = {
    method,
    headers: {
      "Content-Type": "application/json",
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  };

  if (!empty(payload)) opts["body"] = JSON.stringify(payload);

  let ret = { error: "Unable to connect to the API server." };

  try {
    const response = await fetch(url, opts);
    const userIsLoggedIn = Cookies.has("user");

    if (response.status === 403 && userIsLoggedIn) {
      // No need to dispatch users/logout as we're sure the user has been logged out.
      // Dispatching users/logout also causes infinite loop since it internally invokes req
      vuexContext.dispatch("users/setUser", null, { root: true });
      vuexContext.dispatch("users/setLogoutInvoker", "system", { root: true });
      Cookies.remove("user");

      ret = {
        error:
          "Token is invalid/expired or you've been logged into another device.",
      };
    }

    ret = await response.json();
  } catch (err) {}

  return ret;
};

export const decodeUserJWT = function (jwt) {
  let user = null;
  if (jwt) {
    user = decodeJWT(jwt);
    user["accessToken"] = jwt;
  }
  return user;
};

// Unicode \u180E is an invisible char to differentiate "value-label string generated by the system" to "actual string from the user"
export const valueLabelDelimiter = " \u180E--\u180E ";

// Objectify string with encoded "value" and "label"
export const parseValueLabel = function (str) {
  const arr = str.split(valueLabelDelimiter);

  if (empty(arr[1])) return arr[0]; // string
  else
    return {
      value: arr[0],
      label: arr[1],
    };
};

// Stringify object with value and label property
export const stringifyValueLabel = function (obj) {
  return `${
    isStr(obj.value) ? obj.value.toUpperCase() : obj.value
  }${valueLabelDelimiter}${obj.label}`;
};

export const formatFullname = function (
  firstName,
  middleName = null,
  lastName,
  format = "normal"
) {
  if (format === "normal")
    return `${firstName}${middleName ? " " + middleName : ""} ${lastName}`;
  else if (format === "formal")
    return `${lastName}, ${firstName}${middleName ? " " + middleName : ""}`;
  else if (format === "normal_short")
    return `${firstName}${
      middleName ? ` ${__getMiddleInitial(middleName)}` : ""
    } ${lastName}`;
  else if (format === "formal_short")
    return `${lastName}, ${firstName}${
      middleName ? ` ${__getMiddleInitial(middleName)}` : ""
    }`;
};

const __getMiddleInitial = function (middleName = null) {
  if (middleName === null || middleName === "") return "";
  return middleName.substring(0, 1) + ".";
};

export const getAge = function (date) {
  const today = new Date();
  const birthDate = isDate(date) ? date : new Date(date);

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;

  return age;
};

export function round(num, dec_count = 0) {
  return +(Math.round(num + `e+${dec_count}`) + `e-${dec_count}`);
}

export function parseJsonOptions(opts = null) {
  if (opts === null) return null;

  if (
    isStr(opts) &&
    ((opts.startsWith('"') && opts.endsWith('"')) ||
      (opts.startsWith("[") && opts.endsWith("]")) ||
      (opts.startsWith("{") && opts.endsWith("}")))
  )
    return JSON.parse(opts);

  return opts;
}

export function getDistinct(arr, objProp = null) {
  if (!isArr(arr)) throw "First argument should be an array.";

  // If items are objects
  if (objProp) {
    const map = {};

    for (const item of arr) {
      map[item[objProp]] = { ...item }; // Clone item
    }

    return Object.values(map);
  }

  // If items are primitives
  return [...new Set(arr)];
}

// Used to sort array of strings or objects (with string property to be used for sorting) IN PLACE
export const sortStringArr = (arr, key = null, descending = false) => {
  const ret1 = descending ? -1 : 1;
  const ret2 = descending ? 1 : -1;

  arr.sort((a, b) =>
    (a[key] ?? a) > (b[key] ?? b)
      ? ret1
      : (a[key] ?? a) < (b[key] ?? b)
      ? ret2
      : 0
  );
};

// Used to sort array of numbers or objects (with number property to be used for sorting) IN PLACE
export const sortNumberArr = (arr, key = null, descending = false) => {
  arr.sort((a, b) => {
    if (descending) return (b[key] ?? b) - (a[key] ?? a);
    return (a[key] ?? a) - (b[key] ?? b);
  });
};

export const wrapCsvValue = (val, formatFn, row) => {
  let formatted = formatFn !== void 0 ? formatFn(val, row) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`;
};

export const generateAlphaNumericStr = (length) => {
  // Base 36 is alpha-numeric
  return Math.random()
    .toString(36)
    .slice(2, length + 2)
    .toUpperCase();
};

export const stringifyMed = (val, showSetName = true, showFlags = true) => {
  const med = {
    "Generic/Brand Name": val["Generic/Brand Name"],
  };

  if (val["Dose"]) med["Dose"] = val["Dose"];

  const medFlags = [];

  if (val["Discontinued"] && val["Discontinued"].toLowerCase() === "yes")
    medFlags.push("Discontinued");

  if (
    val["With Adverse Effect"] &&
    val["With Adverse Effect"].toLowerCase() === "yes"
  )
    medFlags.push("With Adverse Effect");

  if (val["With Allergy"] && val["With Allergy"].toLowerCase() === "yes")
    medFlags.push("With Allergy");

  return (
    (showSetName && val["Set Name"] ? `${val["Set Name"]} -- ` : "") +
    Object.values(med).join(", ") +
    (showFlags && !arrEmpty(medFlags) ? ` (${medFlags.join(", ")})` : "")
  );
};

export const jsDateToLocalISOString = function (
  jsDate,
  dateOnly = false,
  utc = false
) {
  if (utc) {
    if (dateOnly) return jsDate.toISOString().substring(0, 10);
    else return jsDate.toISOString();
  }

  const year = String(jsDate.getFullYear());
  const month = String(jsDate.getMonth() + 1).padStart(2, "0");
  const date = String(jsDate.getDate()).padStart(2, "0");
  const hours = String(jsDate.getHours()).padStart(2, "0");
  const minutes = String(jsDate.getMinutes()).padStart(2, "0");
  const seconds = String(jsDate.getSeconds()).padStart(2, "0");
  const ms = String(jsDate.getMilliseconds()).padStart(3, "0");

  if (dateOnly) return `${year}-${month}-${date}`;

  return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}.${ms}`;
};

export const isInt = (value) => {
  var x;
  if (isNaN(value)) return false;
  x = parseFloat(value);
  return (x | 0) === x;
};

export function isDecimal(value) {
  return Boolean(value % 1);
}

// export function isNumber(value) {
//   return isInt(value) || isDecimal(value);
// }

export const isNumber = (value) => {
  return !Number.isNaN(Number(value));
};

export const printifyFieldValue = (fieldValue) => {
  const arr = !isArr(fieldValue) ? [fieldValue] : fieldValue;

  return arr
    .map((val) => {
      if (isObj(val))
        return Object.entries(val)
          .map((entry) => `${entry[0]}: ${entry[1]}`)
          .join(", ");

      return val;
    })
    .join("\n");
};

export const inRange = (val, from, to) => {
  return val >= from && val <= to;
};

// Compares two flat objects
export const objsIdentical = (obj1, obj2, ignoredProps = []) => {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;

  for (const key in obj1) {
    if (ignoredProps.includes(key)) {
      // console.log(`Ignoring key ${key}`);
      continue;
    }

    // console.log(key);
    // console.log(
    //   `Comparing ${obj1[key]} and ${obj2[key]}... ${obj1[key] === obj2[key]}`
    // );

    if (obj1[key] !== obj2[key]) return false;
  }

  return true;
};

export const replaceIfInList = (str, searchValueList, replaceValue) => {
  let ret = str;

  for (const searchValue of searchValueList) {
    ret = ret.replace(searchValue, replaceValue);
  }

  return ret;
};

// "Safely" adds prop to `obj` if `val` is not "empty". Modifies the `obj` in place.
export const addProp = (val, propName, obj) => {
  if (!empty(val)) obj[propName] = val;
};

export const formatDateProps = (obj, props, withDayName = true) => {
  for (const prop of props) {
    if (obj[prop]) obj[prop] = formatDate({ date: obj[prop], withDayName });
  }
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const stringifyToggleFieldValue = (val) => {
  return `${val.label} ${val.toggleValue ? "+" : "-"}`;
};

export const runJSCode = (
  defaultValue = null,
  expression = null,
  dependencies = null,
  dataMap = null
) => {
  if (expression === null || dependencies === null || dataMap === null)
    return defaultValue;

  let ret = defaultValue;
  const params = [];
  const args = [];

  for (const dependency of dependencies) {
    if (dataMap[dependency]) {
      const param = dependency;
      const arg =
        dataMap[dependency]?.finalValue?.value ??
        dataMap[dependency]?.finalValue;

      params.push(param);
      args.push(arg);
    }
  }

  try {
    ret = new Function(...params, `return ${expression}`)(...args);
  } catch (err) {
    // if (process.env.DEV) console.log(err);
  }

  return ret;
};

export const stringifyLabPertField = (fieldValue, delimiter = "\n\n") => {
  return fieldValue
    .map((diags) => {
      console.log(diags);
      return diags.map((diag) => {
        return stringifyDiagnostic(diag.value);
      });
    })
    .join(delimiter);
};

export const getFirstLetters = (str) => {
  return str
    .split(" ")
    .map((word) => (word ? word[0] : ""))
    .join("");
};

export const updateObjectCookie = (Cookies, cookieKey, cookieValue) => {
  if (!Cookies.has(cookieKey)) Cookies.set(cookieKey, {});

  const existingObject = Cookies.get(cookieKey);

  Cookies.set(cookieKey, {
    ...existingObject,
    ...cookieValue,
  });
};
