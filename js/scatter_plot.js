function addSeries(name = "", data = "") {
  const seriesId = Date.now();
  const html = `
    <div class="col-md-4 mb-4 series-block" data-id="${seriesId}">
      <div class="card h-100">
        <div class="card-body">
          <div class="mb-2">
            <label class="form-label">Series Name:</label>
            <input type="text" class="form-control series-name" placeholder="e.g., Series A" value="${name}">
          </div>
          <div class="mb-2">
            <label class="form-label">X, Y values (one pair per line, comma or tab separated):</label>
            <textarea class="form-control series-data" rows="6" placeholder="e.g.,\n1, 2\n3, 5\n4, 8">${data}</textarea>
          </div>
          <button class="btn btn-danger remove-series" ${$('.series-block').length === 0 ? 'style="display:none;"' : ''}>Remove Series (-)</button>
        </div>
      </div>
    </div>
  `;
  $('#series-container').append(html);
}

$(document).ready(function () {
  // Add first series by default
  addSeries();

  $('#add-series').click(function () {
    addSeries();
    $('.remove-series').show();
  });

  $(document).on('click', '.remove-series', function () {
    $(this).closest('.series-block').remove();
    if ($('.series-block').length <= 1) {
      $('.remove-series').hide();
    }
  });

  $('#clear-btn').click(function () {
    $('#series-container').empty();
    addSeries();
    $('#plot-container').empty();
  });

  $('#plot-btn').click(function () {
    const traces = [];
    const mode = $('#plot-mode').val();
    const markerSize = parseInt($('#marker-size').val()) || 8;

    $('.series-block').each(function () {
      const seriesName = $(this).find('.series-name').val().trim() || "Unnamed Series";
      const rawData = $(this).find('.series-data').val().trim();

      const xValues = [];
      const yValues = [];

      rawData.split('\n').forEach(line => {
        const parts = line.trim().split(/[\t,]+/);
        if (parts.length >= 2) {
          const x = parseFloat(parts[0].trim());
          const y = parseFloat(parts[1].trim());
          if (!isNaN(x) && !isNaN(y)) {
            xValues.push(x);
            yValues.push(y);
          }
        }
      });

      if (xValues.length > 0) {
        traces.push({
          x: xValues,
          y: yValues,
          name: seriesName,
          type: 'scatter',
          mode: mode,
          marker: { size: markerSize }
        });
      }
    });

    const width = parseInt($('#plot-width').val()) || 700;
    const height = parseInt($('#plot-height').val()) || 500;
    const xAxisLabel = $('#x-axis-label').val() || 'X';
    const yAxisLabel = $('#y-axis-label').val() || 'Y';

    const xMinVal = $('#x-axis-min').val();
    const xMaxVal = $('#x-axis-max').val();
    const yMinVal = $('#y-axis-min').val();
    const yMaxVal = $('#y-axis-max').val();

    const xMin = xMinVal !== '' ? parseFloat(xMinVal) : null;
    const xMax = xMaxVal !== '' ? parseFloat(xMaxVal) : null;
    const yMin = yMinVal !== '' ? parseFloat(yMinVal) : null;
    const yMax = yMaxVal !== '' ? parseFloat(yMaxVal) : null;

    const xaxis = { title: xAxisLabel };
    if (xMin !== null || xMax !== null) {
      xaxis.range = [xMin, xMax];
      xaxis.autorange = false;
    }

    const yaxis = { title: yAxisLabel };
    if (yMin !== null || yMax !== null) {
      yaxis.range = [yMin, yMax];
      yaxis.autorange = false;
    }

    const layout = {
      width: width,
      height: height,
      xaxis: xaxis,
      yaxis: yaxis,
      margin: {
        l: 60,
        r: 30,
        b: 60,
        t: 30
      }
    };

    if (traces.length > 0) {
      Plotly.newPlot('plot-container', traces, layout);
    } else {
      alert("Please enter at least one valid dataset with X, Y pairs.");
    }
  });
});
