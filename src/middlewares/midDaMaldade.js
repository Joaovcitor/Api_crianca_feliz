// const mid = async (req, res, next) => {
//   try {
//     const response = await fetch("https://www.google.com");
//     req.googleHtml = await response.text();
//     next();
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({ errors: "Sem internet!" });
//   }
// };

// module.exports = mid;
