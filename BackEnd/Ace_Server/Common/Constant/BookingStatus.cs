using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Constant
{
    public class BookingStatus
    {
        public const string NotPaid = "Chưa thanh toán";
        public const string Paid = "Đã thanh toán";
        public const string WaitForConfirmCompleted = "Chờ xác nhận hoàn thành";
        public const string ComplaintProgress = "Đang xử lý khiếu nại";
        public const string ComplaintSuccessfully = "Khiếu nại thành công";
        public const string ComplaintFailed = "Khiếu nại thất bại";
        public const string Refunded = "Đã hoàn tiền";
        public const string Completed = "Hoàn thành";
        public const string Canceled = "Hủy";
    }
}
