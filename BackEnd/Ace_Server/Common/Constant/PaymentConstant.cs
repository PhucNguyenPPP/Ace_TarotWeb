using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Constant
{
    public class PaymentConstant
    {
        public const string VnPay = "VnPay";
        public const string PayOs = "PayOS";

        // Payment status
        public const string PendingStatus = "Chờ thanh toán";
        public const string PaidStatus = "Đã thanh toán";
        public const string CancelStatus = "Đã hủy";

        // Unset
        public const string UnSet = "None";
    }
}
