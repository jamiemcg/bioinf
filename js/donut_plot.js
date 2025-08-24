$(document).ready(function () {
  $('#clear-btn').click(function () {
    $('#donut-data').val('');
    $('#plot-container').empty();
  });

  $('#plot-btn').click(function () {
    const rawData = $('#donut-data').val().trim();
    if (!rawData) {
      alert("Please enter data in the format: <value>, <label>");
      return;
    }

    const labels = [];
    const values = [];

    rawData.split('\n').forEach(line => {
      const parts = line.trim().split(/[\s,]+/); // split by comma, space, or tab
      if (parts.length >= 2) {
        const value = parseFloat(parts[0]);
        const label = parts.slice(1).join(' ');
        if (!isNaN(value) && label) {
          values.push(value);
          labels.push(label);
        }
      }
    });

    if (labels.length === 0) {
      alert("No valid entries found. Ensure the format is: <value>, <label>");
      return;
    }

    const width = parseInt($('#plot-width').val()) || 700;
    const height = Math.round(width * 0.75); // proportional height
    const holeSize = Math.max(0, Math.min(1, parseFloat($('#hole-size').val()))) || 0.4;

    const data = [{
      labels: labels,
      values: values,
      type: 'pie',
      hole: holeSize,
      textinfo: 'label+percent',
      insidetextorientation: 'radial'
    }];

    const layout = {
      width: width,
      height: height
    };

    Plotly.newPlot('plot-container', data, layout);
  });
});
