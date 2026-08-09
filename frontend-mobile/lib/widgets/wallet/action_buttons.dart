// frontend-mobile/lib/widgets/wallet/action_buttons.dart
import 'package:flutter/material.dart';

class ActionButtons extends StatelessWidget {
  final VoidCallback onDeposit;
  final VoidCallback onWithdraw;
  final VoidCallback onSwap;
  final VoidCallback onTransfer;

  const ActionButtons({
    super.key,
    required this.onDeposit,
    required this.onWithdraw,
    required this.onSwap,
    required this.onTransfer,
  });

  @override
  Widget build(BuildContext context) {
    final actions = [
      {'icon': Icons.arrow_upward, 'label': 'Deposit', 'onTap': onDeposit},
      {'icon': Icons.arrow_downward, 'label': 'Withdraw', 'onTap': onWithdraw},
      {'icon': Icons.swap_horiz, 'label': 'Swap', 'onTap': onSwap},
      {'icon': Icons.send, 'label': 'Transfer', 'onTap': onTransfer},
    ];

    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceAround,
      children: actions.map((action) {
        return GestureDetector(
          onTap: action['onTap'] as VoidCallback,
          child: Container(
            padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 8),
            decoration: BoxDecoration(
              color: const Color(0xFF1C1C1E),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: const Color(0xFF3A3A3C)),
            ),
            child: Column(
              children: [
                Icon(action['icon'] as IconData, color: Colors.white),
                const SizedBox(height: 4),
                Text(
                  action['label'] as String,
                  style: const TextStyle(color: Colors.white, fontSize: 10),
                ),
              ],
            ),
          ),
        );
      }).toList(),
    );
  }
}