import React, { useState } from 'react';
import { MandiRecord } from '../../types';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Award,
  ArrowUpDown,
  Calendar,
  MapPin,
  Truck,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface MandiPriceTableProps {
  records: MandiRecord[];
}

type SortField = 'price' | 'trend' | 'distance' | 'netPayout' | 'mandi';

export const MandiPriceTable: React.FC<MandiPriceTableProps> = ({ records }) => {
  const { t } = useLanguage();
  const [sortField, setSortField] = useState<SortField>('netPayout');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const sortedRecords = [...records].sort((a, b) => {
    let diff = 0;
    switch (sortField) {
      case 'price':
        diff = a.modalPrice - b.modalPrice;
        break;
      case 'trend':
        diff = a.priceChange - b.priceChange;
        break;
      case 'distance':
        diff = a.distanceKm - b.distanceKm;
        break;
      case 'netPayout':
        diff = a.netPayoutPerQtl - b.netPayoutPerQtl;
        break;
      case 'mandi':
        diff = a.mandiName.localeCompare(b.mandiName);
        break;
      default:
        diff = 0;
    }
    return sortAsc ? diff : -diff;
  });

  return (
    <div id="mandi-all-rates-table-section" className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden mb-8">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 bg-stone-50/70">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-black text-stone-900">
              All Regional Mandi Arrival Rates
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
              DEMO DATA
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Real-time APMC arrivals, quality grade specifications, and day price movements.
          </p>
        </div>

        <div className="text-xs text-stone-500">
          Showing <strong>{sortedRecords.length}</strong> Mandi listings
        </div>
      </div>

      {/* Desktop / Tablet Table View */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-stone-100/80 text-stone-700 font-bold border-b border-stone-200">
            <tr>
              <th className="py-3 px-4">
                <button
                  onClick={() => handleSort('mandi')}
                  className="flex items-center gap-1 hover:text-emerald-800"
                >
                  <span>{t('market.mandiName')} / {t('market.distance')}</span>
                  <ArrowUpDown className="w-3 h-3 text-stone-400" />
                </button>
              </th>
              <th className="py-3 px-4">Crop & Variety</th>
              <th className="py-3 px-4">
                <button
                  onClick={() => handleSort('price')}
                  className="flex items-center gap-1 hover:text-emerald-800"
                >
                  <span>{t('market.pricePerQuintal')} (Modal)</span>
                  <ArrowUpDown className="w-3 h-3 text-stone-400" />
                </button>
              </th>
              <th className="py-3 px-4">High / Low Range</th>
              <th className="py-3 px-4">
                <button
                  onClick={() => handleSort('trend')}
                  className="flex items-center gap-1 hover:text-emerald-800"
                >
                  <span>{t('market.trend')}</span>
                  <ArrowUpDown className="w-3 h-3 text-stone-400" />
                </button>
              </th>
              <th className="py-3 px-4">
                <button
                  onClick={() => handleSort('netPayout')}
                  className="flex items-center gap-1 hover:text-emerald-800"
                >
                  <span>{t('market.netPayout')}</span>
                  <ArrowUpDown className="w-3 h-3 text-stone-400" />
                </button>
              </th>
              <th className="py-3 px-4">{t('market.date')} & Arrival</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {sortedRecords.map((record) => {
              const isTrendUp = record.trend === 'increasing';
              const isTrendDown = record.trend === 'decreasing';

              return (
                <tr
                  key={record.id}
                  className={`hover:bg-stone-50/80 transition-colors ${
                    record.isBestMandi ? 'bg-emerald-50/40' : ''
                  }`}
                >
                  {/* Mandi Name & Best Badge */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-start gap-1.5">
                      {record.isBestMandi && (
                        <Award className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" title="Best Mandi" />
                      )}
                      <div>
                        <div className="font-bold text-stone-900 flex items-center gap-1.5">
                          <span>{record.mandiName}</span>
                          {record.isBestMandi && (
                            <span className="text-[10px] bg-emerald-700 text-white font-bold px-1.5 py-0.2 rounded">
                              Best Mandi
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-stone-400" />
                          <span>{record.district}, {record.state}</span>
                          <span>•</span>
                          <span className="font-semibold text-stone-700">{record.distanceKm} km</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Crop & Variety */}
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-stone-800">{record.cropName}</div>
                    <div className="text-[11px] text-stone-500 truncate max-w-[140px]">
                      {record.variety}
                    </div>
                  </td>

                  {/* Modal Price */}
                  <td className="py-3.5 px-4">
                    <div className="font-black text-stone-900 text-base">
                      ₹{record.modalPrice.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[10px] text-stone-500">per quintal</div>
                  </td>

                  {/* High / Low Range */}
                  <td className="py-3.5 px-4 font-mono text-xs">
                    <div className="text-emerald-700 font-semibold">
                      Max: ₹{record.maxPrice.toLocaleString('en-IN')}
                    </div>
                    <div className="text-rose-700">
                      Min: ₹{record.minPrice.toLocaleString('en-IN')}
                    </div>
                  </td>

                  {/* Trend Indicator */}
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center text-xs font-bold px-2 py-1 rounded-md ${
                        isTrendUp
                          ? 'bg-emerald-100 text-emerald-800'
                          : isTrendDown
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      {isTrendUp && <TrendingUp className="w-3.5 h-3.5 mr-1" />}
                      {isTrendDown && <TrendingDown className="w-3.5 h-3.5 mr-1" />}
                      {record.trend === 'stable' && <Minus className="w-3.5 h-3.5 mr-1" />}
                      <span>
                        {record.priceChange > 0
                          ? `+₹${record.priceChange}`
                          : record.priceChange === 0
                          ? '±₹0 (Stable)'
                          : `-₹${Math.abs(record.priceChange)}`}
                      </span>
                    </span>
                  </td>

                  {/* Net In-Hand Payout */}
                  <td className="py-3.5 px-4">
                    <div className="font-extrabold text-emerald-900 text-sm">
                      ₹{record.netPayoutPerQtl.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[10px] text-stone-500 flex items-center gap-0.5">
                      <Truck className="w-2.5 h-2.5" />
                      <span>-₹{record.transportCostPerQtl} transport</span>
                    </div>
                  </td>

                  {/* Date & Volume */}
                  <td className="py-3.5 px-4 text-xs text-stone-600">
                    <div className="flex items-center gap-1 font-medium">
                      <Calendar className="w-3 h-3 text-stone-400" />
                      <span>{record.date}</span>
                    </div>
                    <div className="text-[11px] text-stone-500 mt-0.5">
                      Arrival: <strong>{record.arrivalVolumeTonnes} T</strong>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
