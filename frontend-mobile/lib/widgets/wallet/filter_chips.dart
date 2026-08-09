// frontend-mobile/lib/widgets/wallet/filter_chips.dart
import 'package:flutter/material.dart';

class FilterChips extends StatelessWidget {
  final bool showCrypto;
  final bool showCurrency;
  final ValueChanged<bool> onToggleCrypto;
  final ValueChanged<bool> onToggleCurrency;

  const FilterChips({
    super.key,
    required this.showCrypto,
    required this.showCurrency,
    required this.onToggleCrypto,
    required this.onToggleCurrency,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: FilterChip(
            label: const Text('Crypto'),
            selected: showCrypto,
            onSelected: onToggleCrypto,
            backgroundColor: const Color(0xFF2C2C2E),
            selectedColor: const Color(0xFFA855F7),
            labelStyle: TextStyle(
              color: showCrypto ? Colors.white : Colors.grey,
            ),
          ),
        ),
        const SizedBox(width: 8),
        Expanded(
          child: FilterChip(
            label: const Text('Currency'),
            selected: showCurrency,
            onSelected: onToggleCurrency,
            backgroundColor: const Color(0xFF2C2C2E),
            selectedColor: const Color(0xFFA855F7),
            labelStyle: TextStyle(
              color: showCurrency ? Colors.white : Colors.grey,
            ),
          ),
        ),
      ],
    );
  }
}