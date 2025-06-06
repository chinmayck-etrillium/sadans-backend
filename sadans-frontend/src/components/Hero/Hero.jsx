import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getTotalCredit,
  getTopThreeClients,
} from "../../store/ReduxStore/Transaction";
import { formatDistanceToNow } from "date-fns";
import { formatCredit } from "../../util/util";
import { getTotalClients } from "../../store/ReduxStore/Clients";

export default function Hero() {
  const dispatch = useDispatch();
  const totalCredit = useSelector((state) => state.transaction.sum);
  const totalClients = useSelector((state) => state.clients.totalClients);
  const topThreeClients = useSelector(
    (state) => state.transaction.topThreeClients
  );

  useEffect(() => {
    dispatch(getTotalCredit());
    dispatch(getTopThreeClients());
    dispatch(getTotalClients());
  }, [dispatch]);

  return (
    <div className="relative bg-white overflow-hidden min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:w-1/2 lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl md:text-5xl">
                <span className="block">Sadans Analytics</span>
                <span className="block text-primary-600">Dashboard</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Get instant insights into your credit operations. Monitor top
                clients, track outstanding amounts, and analyze credit patterns.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link
                    to="/new-transaction"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
                  >
                    New Transaction
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link
                    to="/get-transaction"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 md:py-4 md:text-lg md:px-10"
                  >
                    View Transactions
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div
          className="h-full w-full bg-white p-6 overflow-y-auto"
          style={{ maxHeight: "100vh" }}
        >
          <div className="flex flex-col space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary-50 p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold text-primary-900">
                  Total Credit
                </h3>
                <p className="text-3xl font-bold text-primary-700">
                  {formatCredit(totalCredit)}
                </p>
                <p className="text-sm text-primary-600">+12% from last month</p>
              </div>
              <div className="bg-primary-50 p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-primary-900">
                  Active Clients
                </h3>
                <p className="text-3xl font-bold text-primary-700">
                  {totalClients?.count  }
                </p>
                <p className="text-sm text-primary-600">+2 new this month</p>
              </div>
            </div>

            <div className="bg-white rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">
                Top Credit Holders
              </h3>
              <ul className="space-y-4">
                {topThreeClients.map((item, index) => (
                  <li
                    key={item.client_id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">
                        {item.client_name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {`Last transaction: ${formatDistanceToNow(
                          new Date(item.latest_transaction_date),
                          { addSuffix: true }
                        )}`}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary-600">
                        {formatCredit(item.total_transaction)}
                      </p>
                      <p className="text-sm text-gray-500">Outstanding</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
