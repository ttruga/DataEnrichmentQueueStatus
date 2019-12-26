$(document).ready(function () {
  $('button').click(function () {
    $.post('https://vtsn6uzmfl.execute-api.us-east-1.amazonaws.com/prod/cookies/status',
      { securityToken: '99800b85d3383e3a2fb45eb7d0066a4879a9dad0' },
      function (data, status) {
        $(function () {

          const convert2Date = function (timestamp) {
            const date    = new Date(timestamp * 1000)
            const hours   = date.getHours()
            const minutes = '0' + date.getMinutes()
            const seconds = '0' + date.getSeconds()
            return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)
          }

          let profileHTML   = ''
          let cookieHTML    = ''
          const profileData = data.profileQueueAttr
          const cookieData  = data.cookieQueueAttr.sort(function (a, b) {
            return a.queueUrl.indexOf('stale')
          })

          $.each(profileData, function (i, item) {
            profileHTML += '<tr><td>' + convert2Date(item.LastModifiedTimestamp) + '</td><td>' + item.queueUrl + '</td><td style="text-align:center">' + item.ApproximateNumberOfMessages + '</td></tr>'
          })
          $('#profiles_table').append(profileHTML)

          $.each(cookieData, function (i, item) {
            if (item.queueUrl.indexOf('stale') > 0 && item.ApproximateNumberOfMessages > 0){
              cookieHTML += '<tr style="color:red"><td>' + convert2Date(item.LastModifiedTimestamp) + '</td><td>' + item.queueUrl + '</td><td style="text-align:center">' + item.ApproximateNumberOfMessages + '</td></tr>'
            } else {
              cookieHTML += '<tr><td>' + convert2Date(item.LastModifiedTimestamp) + '</td><td>' + item.queueUrl + '</td><td style="text-align:center">' + item.ApproximateNumberOfMessages + '</td></tr>'
            }
          })
          $('#cookies_table').append(cookieHTML)

          // $('#cookies_table td').each(function () {
          //   const num = parseFloat($(this).text())
          //   if ($(this).text().indexOf('stale') && num > 0) {
          //     $(this).css('color', 'Red')
          //   }
          // })
        })
      })
  })
})
