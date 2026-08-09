// frontend-mobile/lib/widgets/wallet/total_value_card.dart
import 'package:flutter/material.dart';

class TotalValueCard extends StatelessWidget {
  final double totalValue;
  final double dailyInterest;
  final VoidCallback onWithdrawInterest;

  const TotalValueCard({
    super.key,
    required this.totalValue,
    required this.dailyInterest,
    required this.onWithdrawInterest,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF1C1C1E),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFF3A3A3C)),
      ),
      child: Column(
        children: [
          const Text(
            'Total Assets',
            style: TextStyle(color: Colors.grey, fontSize: 12),
          ),
          const SizedBox(height: 4),
          Text(
            '\$${totalValue.toStringAsFixed(4)}',
            style: const TextStyle(
              color: Colors.white,
              fontSize: 28,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 12),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            decoration: BoxDecoration(
              color: Colors.black,
              borderRadius: BorderRadius.circular(20),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    const Icon(Icons.trending_up, color: Colors.green, size: 16),
                    const SizedBox(width: 4),
                    Text(
                      '\$${dailyInterest.toStringAsFixed(6)}',
                      style: const TextStyle(
                        color: Color(0xFF22C55E),
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
                ElevatedButton(
                  onPressed: onWithdrawInterest,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF38BDF8),
                    foregroundColor: Colors.black,
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  child: const Text('Withdraw'),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}