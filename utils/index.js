const idade = function calculateExactAge(birthDate) {
  const today = new Date();
  const birth = new Date(birthDate);

  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();

  if(months < 0 || (months === 0 && days < 0)) {
    years--;
    months += 12
  }

  if (days < 0) {
    months -= 1;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate()
  }

  return { years, months, days }
}

module.exports = idade