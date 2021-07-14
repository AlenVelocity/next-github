const styles = (color: string, progress: string) => `\<style>
.title {
  font-family: "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;
  font-size: 20px;
  font-weight: 700; 
  fill: #000; 
  animation: fadeIn 0.8s ease-in-out forwards;
}
.item { 
  opacity: 0;
  animation: fadeIn 0.3s ease-in-out forwards;
}

.contribution-stats { 
  font-family: "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;
  font-weight: 400;
  font-size: 14px;
  fill: #333;
}
.remarks {
  font-size: 11px;
}
.rating-letter-sign { 
  font-family: "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;
  font-size: 38px;
  font-weight: 700; 
  fill: ${color};
  animation: scaleIn 0.3s ease-in-out forwards;
}
.rating-circle-stroke {
  stroke: #ababab;
  stroke-width: 7.5;
  fill: none;
  opacity: 0.2;
}

.rating-circle {
  stroke: ${color};
  stroke-dasharray: 250;
  stroke-width: 7.5;
  stroke-linecap: round;
  fill: none;
  opacity: 0.8;
  transform-origin: -10px 8px;
  transform: rotate(-90deg);
  animation: ratingProgressAnimation 1s forwards ease-in-out;
}

.bolder { 
  font-weight: 700;
  font-family: "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;
}
@keyframes scaleIn {
  from {
    transform: translate(-5px, 5px) scale(0);
  }
  to {
    transform: translate(-5px, 5px) scale(1);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes ratingProgressAnimation {
  from {
    stroke-dashoffset: 250;
  }
  to {
    stroke-dashoffset: ${progress};
  }
}
</style>
`

export default styles
