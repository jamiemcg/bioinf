function addGroup(name = "", data = "") {
    const groupId = Date.now(); // unique ID
    const html = `
      <div class="col-md-4 mb-4 group-block" data-id="${groupId}">
        <div class="card h-100">
          <div class="card-body">
            <div class="mb-2">
              <label class="form-label">Group Name:</label>
              <input type="text" class="form-control group-name" placeholder="e.g., Group A" value="${name}">
            </div>
            <div class="mb-2">
              <label class="form-label">Data Points (one per line):</label>
              <textarea class="form-control group-data" rows="4" placeholder="e.g.,\n5\n10\n15">${data}</textarea>
            </div>
            <button class="btn btn-danger remove-group" ${$('.group-block').length === 0 ? 'style="display:none;"' : ''}>Remove Group (-)</button>
          </div>
        </div>
      </div>
    `;
    $('#groups-container').append(html);
  }

  $(document).ready(function () {
    // Add first group by default
    addGroup();

    $('#add-group').click(function () {
      addGroup();
      $('.remove-group').show(); // show remove buttons if >1 group
    });

    $(document).on('click', '.remove-group', function () {
      $(this).closest('.group-block').remove();
      if ($('.group-block').length <= 1) {
        $('.remove-group').hide();
      }
    });

    $('#clear-btn').click(function () {
      $('#groups-container').empty();
      addGroup();
      $('#plot-container').empty();
    });

    $('#plot-btn').click(function () {
      const traces = [];

      $('.group-block').each(function () {
        const groupName = $(this).find('.group-name').val().trim() || "Unnamed Group";
        const rawData = $(this).find('.group-data').val().trim();
        const values = rawData.split('\n').map(x => parseFloat(x.trim())).filter(x => !isNaN(x));

        if (values.length > 0) {
          traces.push({
            y: values,
            name: groupName,
            type: 'violin',
            points: 'all',
            pointspos: 1,
            box: {
              visible: true
            }
          });
        }
      });

      const width = parseInt($('#plot-width').val()) || 700;
      const height = parseInt($('#plot-height').val()) || 500;
      const yAxisLabel = $('#y-axis-label').val() || 'Value';

      const layout = {
        width: width,
        height: height,
        yaxis: {
          title: yAxisLabel
        },
        margin: {
          l: 60,
          r: 30,
          b: 100,  // more space for long group names
          t: 30
        },
        xaxis: {
          automargin: true
        }
      };

      if (traces.length > 0) {
        Plotly.newPlot('plot-container', traces, layout);
      } else {
        alert("Please enter at least one valid dataset.");
      }
    });
  });